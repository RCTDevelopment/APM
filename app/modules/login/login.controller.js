'use strict';

//Register a new controller for your module dockingStations
angular.module('login').controller('LoginController', LoginController);

LoginController.$inject = ['$state', '$http', 'Authentication', '$sessionStorage'];

function LoginController($state, $http, Authentication, $sessionStorage) {
  var vm = this;

  vm.username = null;
  vm.pwd = null;

  vm.signin = function() {
    Authentication.login(vm.username, vm.pwd).then(function success(response) {
      Authentication.getUserInfo(vm.username).then(function success(response) {
        var user_roles = [];
        // response.data[0].roles.forEach(function(role) {
        //   user_roles.push(role.name)
        // })
        user_roles.push("ADMIN")
        Authentication.setCredentials(response.data[0].username, user_roles, response.data[0])
        Authentication.isAuthenticated = true;
        if (Authentication.isAuthenticated) {
          $state.go('home');
        }
     })
    }, function error(response) {
      console.log('Could not log in, ERRORRRRRR')
      console.log(response);
    });
  };
}
