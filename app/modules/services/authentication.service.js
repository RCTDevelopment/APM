
angular.module('andruclient').service('Authentication', authentication);

authentication.$inject = ['$http', '$sessionStorage', '$localStorage'];

function authentication($http, $sessionStorage, $localStorage) {

  this.login = function(username, password) {
    var login_string =
    { 'username':  username,
      'password' : password
    }
    var conf = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    return $http.post('/angular/api/login.php', login_string, conf);
  };

  this.getUserInfo = function(username) {
    return $http.get('/angular/api/getUserInfo.php',{username:"andru"});
  }

  this.setCredentials = function(username, roles, user_object) {
    $sessionStorage.globals = {
      currentUser: {
        username: 'andru',
        roles: ['ADMIN', 'USER_ADMIN', 'REQUESTER', 'APPROVER']
      },
      userObject: {username:'andru',password:'andru'}
    };
  };

  this.isAuthenticated = function() {
    //if ($sessionStorage.globals) {
      return true;
    //} else {
      //return false;
    //}
  }

  this.isRole = function(role) {
    var isRole = false;
    for (var i = 0; i < $sessionStorage.globals.currentUser.roles.length; i++) {
      if ($sessionStorage.globals.currentUser.roles[i] === role) {
        isRole = true;
      }
    }
    return isRole;
  }

  this.clearCredentials = function() {
    delete $sessionStorage.globals;
  };
}
