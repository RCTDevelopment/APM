// Create the Socket.io wrapper service
angular.module('andruclient').service('Socket', socket);

socket.$inject = ['$timeout', '$location'];

function socket($timeout, $location) {

  //  Connect to Socket.io server
  this.connect = function() {
    //Get the URL location to connect to the socket server
    this.socket = io($location.absUrl().split('#')[0].slice(0, -1) + ':80');
  };
  this.connect();

  // Wrap the Socket.io 'on' method
  this.on = function(eventName, callback) {
    if (this.socket) {
      this.socket.on(eventName, function(data) {
        $timeout(function() {
          callback(data);
        });
      });
    }
  };

  // Wrap the Socket.io 'emit' method
  this.emit = function(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  };

  // Wrap the Socket.io 'removeListener' method
  this.removeListener = function(eventName) {
    if (this.socket) {
      this.socket.removeListener(eventName);
    }
  };
}
