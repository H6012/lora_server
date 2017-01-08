var PORT = 1600;

/* 


*/




var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
 	 console.log(remote.address + ':' + remote.port );

	//Byte 0 in buffer should be the protocol version, 1
	//Byte 1 and 2 are the random token
	//Byte3 is PUSH_Data Identifier
	//Byte4-11 is the MAC Address of the gateway! 
	//12-end is Jason object (if present)

	

	if(message.length>12){
		var header = message.slice(0,12);
		var json_data = message.slice(12);	

		console.log(header.toString('hex'));	

		
		var obj = JSON.parse(json_data.toString('utf8'));	
	        		
		console.log('Encrypted Data'  + obj.rxpk[0].data);

		var b = new Buffer(obj.rxpk[0].data, 'base64');
		console.log('Base64 decoded:- '  + b.toString('hex'));




		
		}
	else{
		//Just print hex values from the header! 
		console.log(message.toString('hex'));
	}

});

server.bind(PORT);