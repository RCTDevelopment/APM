
angular.module('andruclient').service('Authentication', authentication);

authentication.$inject = ['$http', '$sessionStorage', '$localStorage'];

function authentication($http, $sessionStorage, $localStorage) {

  this.login = function(username, password) {
    var login_string =
    {
      'username':  username,
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
    var user_string = {
      'username' : username
    }
    var conf = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    return $http.post('/angular/api/getUserInfo.php',user_string,conf);
  }

  this.setCredentials = function(username, roles, user_object) {
    $sessionStorage.globals = {
      currentUser: {
        username: username,
        roles: roles
      },
      userObject: user_object
    };
  };

  this.isAuthenticated = function() {
    if ($sessionStorage.globals) {
      return true;
    } else {
      return false;
    }
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
