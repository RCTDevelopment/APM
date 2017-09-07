
angular.module('andruclient').service('LoginService', login);

function login($http) {
  this.login = function(username, password) {
    var login_string = 'username=' + username + '&password=' + password;
    var conf = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    return $http.post('/dbpservice/login', login_string, conf);
  }
  this.getUserInfo = function(username) {
    return $http.get('/dbpservice/user/get?search=username:' + username);
  }
}
