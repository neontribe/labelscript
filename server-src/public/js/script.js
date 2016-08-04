$(document).ready(function() {
    var editorUI = window.editor = new labelscript.EditorUI($, $('#editor')[0]);

    /* todo refactor me away from shitquery */
    $('#controls .move').click(function() {
        editorUI.editor.add(new labelscript.Move(103));
    });

    $('#controls .rotate').click(function() {
    });

    $('#controls .loop').click(function() {
    });

    $('#controls .jump').click(function() {
    });
});
