(function(scope) {
	'use strict';
    /*
     *  T O D O
     *  - Search 'todo', fix
     *
     *  - Implement canvas for label
     *  - Add modal implementation for accepting command parameters
     *  - Create print button
     *  - Add modal implementation for print
     */

    scope = scope.labelscript = {};
    
    /*
     * todo dont keep this here
     */
    const _CSS =
    `<style>
        .label {
            display: inline-block;
            padding-left: 50px;
            padding-right: 50px;
        }
        .label ul {
            display: inline-block;
        }
        .column {
            font-size: 10px;
        }
        .column li {
            width: 10px;
            height: 10px;
        }
        .column li::after {
            content: '\\25A1';
        }
        .column li.blk::after {
            content: '\\25FC';
            position: relative;
            /* this black square is annoyingly offset by 1px */
            left: -1px;
        }

        .chip {
            float: left;
        }
        .commands .chip .material-icons {
            cursor: pointer;
            float: right;
            font-size: 16px;
            line-height: 32px;
            padding-left: 8px;
        }

        .commands .chip .badge {
            position: initial;
        }
        .commands .chip.rotate .badge::after {
            content: '\\00B0';
        }

        .commands .chip.highlighted {
            background-color: #ffcf0c;
        }
    </style>`;

    const _ERRORS = {
        EDITOR_NO_EDITOR_SELECTOR: 'No editor selector parameter supplied to the Editor UI constructor.',
        EDITOR_NO_CONTROL_SELECTOR: 'No control selector parameter supplied to the Editor UI constructor.',
        EDITOR_NO_JQUERY: 'No jQuery parameter supplied to the Editor UI constructor.',
        LABEL_MAX_COLUMNS: 'Max columns for Label.',
    }

    /*
     * @class Command
     *
     * Stores a command and relevant data
     * by default the command is empty
     */
    class Command {
        constructor() {
            this.id = this._guid();
            this.MAX_BIT_PER_COLUMN = 6;
            this.type = 'default';
        }
        /*
         * http://stackoverflow.com/a/105074
         */
        _guid() {
            /* todo move this to private method */
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            var out = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();

            return out;
        }
        _command(length) {
            var command = [0, 0, 0];
            //generates an array for the current command
            return command.concat(this._lengthToColumn(length)); 
        }
        _lengthToColumn(length) {
            var binaryLength = this._integerToBinaryString(length);
            // we reverse here
            var binaryArr = binaryLength.split('').reverse().map((bit) => parseInt(bit));
            if (binaryArr.length < 3) {
                binaryArr = this._padColumn(binaryArr, 0, 3);
            }
            // just enforce the length here
            binaryArr.length = 3;
            return binaryArr;
        }
        _padColumn(column, pad, max) {
            if( typeof max === "undefined" ) {
                max = this.MAX_BIT_PER_COLUMN;
            }

            if(column.length === max) {
                return column;
            }
            var oldLength = column.length;
            column.length = max;
            return column.fill(pad, oldLength);
        }
        _integerToBinaryString(integer) {
            /*
             * http://stackoverflow.com/a/16155417
             */
            return (integer >>> 0).toString(2);
        }
        _binaryStringToColumns(binaryString) {
            var self = this;
            var dataColumns = [];
            var column = [];
            binaryString.split('').reverse().map(function(bit) {
                column.push(parseInt(bit));
                if( !( column.length % self.MAX_BIT_PER_COLUMN ) ) {
                    dataColumns.push(column);
                    column = [];
                }
            });
            /* if a column has data and is not in dataColumns, pad it first */
            if (column.length) {
                dataColumns.push(this._padColumn(column, 0));
            } 
            return dataColumns;
        }
        *columns() {
            var self = this;
            var binaryData = this._integerToBinaryString(this.data);
            var columns = this._binaryStringToColumns(binaryData);
            // todo enforce max columns of 7

            // prepare the length data
            yield this._command(columns.length);
            yield* columns;
        }
    }

    /* 
     * @class Editor
     *
     * Skeleton class that allows access to command instances
     */
    class Editor {
        constructor() {
            this.commands = [];
        }
        add(command) {
            this.commands.push(command);
        }
        /* 
         *
         * This method adds to a target command for commands that accept nesting 
         * */
        addTo (commandId, command) {
            // get last matching command (L->R)
            var targetCommand = this.commands.filter((command) => command.id === commandId).pop();
            if (targetCommand && typeof targetCommand.add === 'function') {
                targetCommand.add(command);
            }
            /* todo throw error here */
        }
        /* Produces instances of the Label class from the commands */

        /* todo maybe move this into UI/Editor attribute as part of a Printer class,
         * leave Editor purely for manipulation */
        *labels() {
            if (!this.commands.length) {
                return [];
            }
            var label = new scope.Label();
            for (let command of this.commands) {
                for (let column of command.columns()) {
                    try {
                        label.add(column);
                    } catch (e) {
                        if(e.message !== _ERRORS.LABEL_MAX_COLUMNS) {
                            throw e;
                        }
                        yield label;
                        label = new scope.Label();
                        label.add(column);
                    }
                }
            }
            /* todo pad the label with [0, 0, 0, 0] columns if less than MAX_COLUMNS */
            yield label;
        }
    }

    /* module.exports... lol */
    // todo check doc format
    /*
     * @class EditorUI
     * @param $ jQuery instance
     * @param editorSelector jQuery selector
     * @param controlSelector jQuery selector
     */
    scope.EditorUI = class EditorUI {
        constructor($, editorSelector, controlSelector) {
            if (!$) {
                throw new Error(_ERRORS.EDITOR_NO_JQUERY);
            }
            if (!editorSelector) {
                throw new Error(_ERRORS.EDITOR_NO_EDITOR_SELECTOR);
            }
            if (!controlSelector) {
                throw new Error(_ERRORS.EDITOR_NO_CONTROL_SELECTOR);
            }
            this.editor = new Editor();
            // todo template this from a const
            this.state = {
                command: {
                    add: []
                }
            };
            this.$ = $;
            this.editorSelector = editorSelector;
            this.controlSelector = controlSelector
            // todo group listen functions into generic method
            // todo fix the action/enable mess
            this._listenForControls(true);
            this._listenForCommands(true);
            this.render();
        }

        _setState(action, value) {
            switch(action) {
                case 'LOOP_INSERT':
                    // set the insert location for commands to the loop ID
                    if(this.state.command.add.indexOf(value) === -1) {
                        this.state.command.add.push(value);
                    }
                    break;
                case 'LOOP_INSERT_EXIT':
                    this.state.command.add.pop();
                    break;
            }
        }



        /*
         * Bind listeners on the controls UI 
         */
        _listenForControls(enable) {
            var action = enable ? 'on' : 'off';
            var self = this;
            $(this.controlSelector)[action]('click', '.move', function handleMove (evt) { 
                evt.stopImmediatePropagation();
                // if there is a target then add the command there

                // todo get target method
                var targets = self.state.command.add;
                if (targets.length) {
                    self.editor.addTo(targets[targets.length-1], new labelscript.Move(103)); 
                } else {
                    self.editor.add(new labelscript.Move(103)); 
                }
                self.render();
            });

            $(this.controlSelector)[action]('click', '.rotate', function handleRotate (evt) { 
                evt.stopImmediatePropagation();
                var targets = self.state.command.add;
                if (targets.length) {
                    self.editor.addTo(targets[targets.length-1], new labelscript.Rotate(360)); 
                } else {
                    self.editor.add(new labelscript.Rotate(360)); 
                }
                self.render();
            });


            $(this.controlSelector)[action]('click', '.loop', function handleLoop (evt) { 
                evt.stopImmediatePropagation();
                /* todo nested loops, does our interpreter handle it? */
                self.editor.add(new labelscript.Loop(10)); 
                self.render();
            });

        
            $('body')[action]('click', function exitLoop (evt) {
                self._setState('LOOP_INSERT_EXIT')
                self.render();
            });

            /*
            $('#controls .jump').click(function() {
            }); */
        }

        /*
         * todo
         * Binds listeners on the command 'pills' in the editor
         */
        _listenForCommands(enable) {
            var action = enable ? 'on' : 'off';
            var self = this;
            $(this.editorSelector)[action]('click', '.editor-command-add', function handleCommandAdd (evt) {
                evt.stopImmediatePropagation();
                var $addIcon = $(evt.currentTarget);
                var $command = $addIcon.parents('.editor-command');

                var commandId = $command.attr('x-track');

                /* todo use constants with state instead of strings */
                self._setState('LOOP_INSERT', commandId);
                self.render();
            });
        }
        


        /*
         * Partial Building Functions
         */
        _buildCommands(commands) {
            return commands.map((command) => this._buildCommand(command));
        }
        _buildCommand(command) {
            /*
                <!--<i class="material-icons editor-command-close">close</i>
                <i class="material-icons editor-command-settings">settings</i>
                <i class="material-icons editor-command-swap">swap_horiz</i>--> */
            var commandButtons = '';
            var innerContent = '';
            var badgeContent = parseInt(command.data);
            var commandClasses = command.type;
            /* todo move this into switch for other types */
            /* todo change types to constants */
            if (command.type === 'loop') {
                /* todo move this into a function to check if id is active */
                if (this.state.command.add.length && this.state.command.add[this.state.command.add.length-1] === command.id) {
                    commandClasses += ' highlighted';
                }
                commandButtons += ' <i class="material-icons editor-command-add">add</i>';
                innerContent += this._buildCommands(command.commands).join('');
            }
            
            /* 
             * todo remove logic from templ strings
             *
             * command.data could potentially contain user-supplied content
             * if command.data is no longer cast to int, then be careful here
             * and template correctly.
             *
             * todo investigate buildCommands->buildCommand-> recursion perf
             */
            var commandMarkup = 
            `<div x-track="${ command.id }" class="chip editor-command ${ commandClasses }">
                ${ command.type.toUpperCase() }
                ${ innerContent }
                <span class="badge">${ badgeContent }</span>
                ${ commandButtons }
            </div>`;
            return commandMarkup;
        }
        _buildLabels(labels) {
            return labels.map((label) => this._buildLabel(label));
        }
        _buildLabel(label) {
            var listItems = label.columns.map((column) => this._buildColumn(column));
            var labelMarkup =
            `<div class="label">
                ${ listItems.join('') }
            </div>`;
            return labelMarkup;
        }
        _buildColumn(column) {
            var listItems = column.map((row) => `<li class="${ row === 1 ? 'blk' : '' }"></li>`);
            var columnMarkup =
            `<ul class="column">
                ${ listItems.join('') }
            </ul>`;
            return columnMarkup;
        }


        /*
         * UI Building Functions
         */
        _buildCommandUI() {
            var listItems = this._buildCommands(this.editor.commands);
            var commandUIMarkup =
            `<div class="commands">
                ${ listItems.join('') }
            </div>`;
            return commandUIMarkup;
        }
        _buildLabelUI() {
            var listItems = this._buildLabels([...this.editor.labels()]);
            var labelUIMarkup = 
            `<div class="labels">
                <div class="row">
                    <div class="col s12">
                        ${ listItems.join('') }
                    </div>
                </div>
            </div>`;
            return labelUIMarkup;
        }
        _build() {
            return _CSS + this._buildCommandUI() + this._buildLabelUI();
        }


        /*
         * 'dumb' render function
         */
        render() {
            var $ = this.$;
            $(this.editorSelector).html(this._build());
        }
    }

    /*
     * @class Label
     *
     * Represents a label containing columns of instructions
     */
    scope.Label = class Label {
        constructor() {
            this.MAX_COLUMNS = 7;
            this.columns = [];
        }
        add(column) {
            if(this.columns.length === this.MAX_COLUMNS) {
                throw new Error(_ERRORS.LABEL_MAX_COLUMNS);
            } else {

            }
            this.columns.push(column);
        }
    }

    /*
     * @class Move
     * @extends Command
     * @param data data associated with the MOVE command
     */
    scope.Move = class Move extends Command {
        constructor(data) {
            super();
            this.data = data;
            this.type = 'move';
        }
        _command(length) {
            var command = [1, 0, 0];
            //generates an array for the current command
            return command.concat(this._lengthToColumn(length)); 
        }
    }

    /*
     * @class Rotate
     * @extends Command
     * @param data data associated with the ROTATE command
     */
    scope.Rotate = class Rotate extends Command {
        constructor(data) {
            super();
            this.data = data;
            this.type = 'rotate';
        }
        _command(length) {
            var command = [0, 1, 0];
            //generates an array for the current command
            return command.concat(this._lengthToColumn(length)); 
        }
    }

    /*
     * @class Loop
     * @extends Command
     * 
     * This is a meta command that exposes an 'add' method
     * This method allows the editor to nest commands within the Loop's data attribute
     */
    scope.Loop = class Loop extends Command {
        constructor(data) {
            super();
            this.commands = [];
            this.data = data;
            this.type = 'loop';
        }
        *_command(length) {
            // start loop
            yield [1, 1, 0].concat(this._lengthToColumn(length));
            // end loop
            yield [0, 0, 1, 0, 0, 0];
        }
        *columns() {
            var binaryData = this._integerToBinaryString(this.data);
            var columns = this._binaryStringToColumns(binaryData);
            var commandGen = this._command(columns.length);

            yield commandGen.next(columns.length).value;
            // this data is the number of times we should loop
            yield* columns;
            // this are the inner commands in the loop
            yield* this.commands.reduce((reduction, command) => reduction.concat([...command.columns()]), []);
            // this flushes the endloop command
            yield commandGen.next().value;
        }
        add(command) {
            this.commands.push(command);
        }
    }

    // todo Jump
    scope.Jump = class Jump extends Command {}
})(window);
