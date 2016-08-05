var io = require('socket.io-client');
var shell = require('shelljs');
var fs = require('fs');
var args = process.argv.slice(2);
var server = args[0] || 'http://localhost:3000';
var client = io(server);

client.on('connect', function(){
	console.log('Connected! :)')
	client.on('print', function(labelScriptArr) {
		console.log(labelScriptArr);
		labelScriptArr.unshift(['――――――――――――――――']);
		fs.writeFileSync('./tmp.txt',labelScriptArr.join('\n'));
		var result = shell.exec('lpr -o landscape -o PageSize=24_mm__1___Label__Auto_ tmp.txt');
		if (result.code === 0) {
			client.emit('success', 'Last printed ' + labelScriptArr.join('\n'));
		} else {
			client.emit('success', 'Something exploded!' + result.stdout); 
		}
	});
});
