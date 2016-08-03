var io = require('socket.io');

function Printer() {}

Printer.prototype.setSocket = function(socket) {
    this.socket = socket;
}

Printer.prototype.getStatus = function() {
    if(this.socket) {
        return 'Connected';
    }
    return 'No Connection';
}

var myPrinter = new Printer();

module.exports = {
    setup: function setup(app) {
        io = io(app);
        io.on('connection', function(socket) {

        });
    },
    printer: myPrinter
}
