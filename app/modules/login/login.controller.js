'use strict';

//Register a new controller for your module dockingStations
angular.module('login').controller('LoginController', LoginController);

LoginController.$inject = ['$state', '$http', 'Authentication', '$sessionStorage','DialogService'];

function LoginController($state, $http, Authentication, $sessionStorage,DialogService) {
  var vm = this;

  vm.username = null;
  vm.pwd = null;

  vm.signin = function(ev) {
    Authentication.login(vm.username, vm.pwd).then(function success(response) {
      Authentication.getUserInfo(vm.username).then(function success(response) {
        var user_roles = [];
        user_roles.push(response.data.role)
        Authentication.setCredentials(response.data.username, user_roles, response.data)
        if (Authentication.isAuthenticated) {
          $state.go('home');
        }
     })
    }, function error(response) {
      DialogService.showAlert(ev,'Password', 'Incorrect login details.', 'Re enter');
      vm.pwd = null;
    });
  };
}
