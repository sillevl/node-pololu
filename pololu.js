
var net = require('net');

var Pololu = function(id, host, port){
  this.id = id;
  this.host = host;
  this.port = port;
  var client = new net.Socket();
  client.connect(1337, '127.0.0.1', function() {
  	console.log('Connected');
  	client.write('Hello, server! Love, Client.');
  });

  // setters
  this.drive = function(speed){

  };
  this.turn = function(turnspeed){

  };
  this.stop = function(){

  };
  this.calibrate = function(){

  };
  this.led = function(index, state){

  };

  // getters
  this.line_sensor = function(callback){
    return 0;
  }
}
