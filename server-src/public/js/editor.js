(function(scope) {
    scope = scope.labelscript = {};

    const _CSS =
    `<style>
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
    </style>`;

    const _ERRORS = {
        EDITOR_NO_EL: 'No element parameter supplied to the Editor UI constructor.',
        EDITOR_NO_JQUERY: 'No jQuery parameter supplied to the Editor UI constructor.',
        LABEL_MAX_COLUMNS: 'Max columns for Label.',
    }

    class Command {
        constructor() {
            this.id = this._guid();
            this.MAX_BIT_PER_COLUMN = 4;
            this.type = 'default';
        }
        /*
         * http://stackoverflow.com/a/105074
         */
        _guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            var out = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();

            return out;
        }
        _end() {
            return [0, 0, 0, 0]
        }
        _command() {
            //generates an array for the current command
            return this._end(); 
        }
        _padColumn(column, pad) {
            if(column.length === this.MAX_BIT_PER_COLUMN) {
                return column;
            }
            var oldLength = column.length;
            column.length = this.MAX_BIT_PER_COLUMN;
            return column.fill(pad, oldLength);
        }
        *columns() {
            /*
             * http://stackoverflow.com/a/16155417
             */
            var binaryString = (this.data >>> 0).toString(2);

            yield this._command();

            var output = [];
            for (let bit of binaryString.split('')) {
                output.push(parseInt(bit));
                if( !( output.length % this.MAX_BIT_PER_COLUMN ) ) {
                    yield output;
                    output = [];
                }
            }
            if (output.length) {
                yield this._padColumn(output);
            }

            yield this._end();
        }
    }

    class Editor {
        constructor() {
            this.commands = [];
        }
        add(command) {
            this.commands.push(command);
        }

        /* A generator that produces instances of the Label class */
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
            yield label;
        }
    }

    /* module.exports... lol */
    scope.EditorUI = class EditorUI {
        constructor($, el) {
            if (!$) {
                throw new Error(_ERRORS.EDITOR_NO_JQUERY);
            }
            if (!el) {
                throw new Error(_ERRORS.EDITOR_NO_EL);
            }
            this.editor = new Editor();
            this.$ = $;
            this.element = el;
            this._listen(true);
            this.render();
        }


        /*
         * Bind Listeners
         */
        _listen(disable) {
            var action = disable ? 'off' : 'on';
            $('.controls .move', this.element)[action]('click', () => this.editor.add(new labelscript.Move(103)));

            /*
            $('#controls .rotate').click(function() {
            });

            $('#controls .loop').click(function() {
            });

            $('#controls .jump').click(function() {
            }); */
        }


        /*
         * Partial Building Functions
         */
        _buildCommands(commands) {
            return commands.map((command) => this._buildCommand(command));
        }
        _buildCommand(command) {
            /* 
             * command.data could potentially contain user-supplied content
             * if command.data is no longer cast to int, then be careful here
             * and template correctly.
             */
            var commandMarkup = 
            `<div x-track="${ command.id }" class="chip ${ command.type === 'rotate' ? 'rotate' : '' }">
                ${ command.type.toUpperCase() }
                <span class="badge">${ parseInt(command.data) }</span>
                <i class="material-icons">close</i>
                <i class="material-icons">settings</i>
                <i class="material-icons">swap_horiz</i>
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
                ${ listItems.join('') }
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
            $(this.element).html(this._build());
        }
    }
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
    scope.Move = class Move extends Command {
        constructor(data) {
            super();
            this.data = data;
            this.type = 'move';
        }
        _command() {
            return [1, 0, 0, 0]
        }
    }
    scope.Rotate = class Rotate extends Command {}
    scope.Loop = class Loop extends Command {}
    scope.Jump = class Jump extends Command {}
})(window);
