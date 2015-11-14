
var net = require('net');

var Pololu = function(id, port, host){
  this.id = id;

  if (port == undefined) {
    port = 22446
  }

  if (host == undefined) {
    host = '127.0.0.1'
  }

  var client = new net.Socket;
  client.connect(port, host);

  // setters
  this.drive = function(speed){
    set({speed: speed})
  }

  this.turn = function(turnspeed){
    set({turnspeed: turnspeed})
  }

  this.stop = function(){
    set({stop: true})
  }

  this.calibrate = function(){
    set({calibrate: true})
  }

  this.led = function(index, state){
    set({led: index, state: state})
  }

  // getters
  this.get_line_sensor = function(callback){
    get('linesensor')
    client.once('data', function(data){
      var line_sensor_value = JSON.parse(data).linesensor
      if (typeof callback !== 'undefined') {
        callback(line_sensor_value)
      }
    })
  }

  var set = function(data){
    data.id = id
    client.write(JSON.stringify(data));
  }

  var get = function(type){
    client.write(JSON.stringify({id: id, get: type}));
  }

  this.close = function(){
    client.close()
  }
}

exports.create = function(id, host, port) {
  return new Pololu(id, host, port);
};
