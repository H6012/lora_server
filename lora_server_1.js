var PORT = 1600;


var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
 	   console.log(remote.address + ':' + remote.port );

	if(message.length>12){
		var header = message.slice(0,12);
		var data = message.slice(12);	

		console.log(header.toString('hex'));	
	        console.log(data.toString('utf8'));	
		
		}
	else{
		//Just print hex values from the header! 
		console.log(message.toString('hex'));
	}

});

server.bind(PORT);