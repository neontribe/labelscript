var io = require('socket.io');

function Printer() {}

Printer.prototype.setSocket = function(socket) {
    this.socket = socket;
}

Printer.prototype.getStatus = function() {
    if(this.socket) {
        return 'Connected ' + (this.successString ? this.successString : '');
    }
    return 'No Connection';
}

Printer.prototype.sendToPrinter = function(LabelScript) {
	if(this.socket) {
		this.socket.emit('print', LabelScript);
		var self = this;
		this.socket.once('success', function(successString) {
			self.successString = successString;
		});
	}
}

var myPrinter = new Printer();

module.exports = {
    setup: function setup(app) {
        io = io(app);
        io.on('connection', function(socket) {
		myPrinter.setSocket(socket);
		console.log('has connection');        
	});
	
    },
    printer: myPrinter
}

//lpr -o landscape -o PageSize=24_mm__1___Label__Auto_ ~/Documents/Untangled2016/blocktest.txt
