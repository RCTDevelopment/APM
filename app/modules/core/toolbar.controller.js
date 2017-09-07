'use strict';

angular.module('andruclient').controller('ToolbarController', ToolbarController);

ToolbarController.$inject = ['$state', 'Authentication', '$rootScope', 'menuService', '$sessionStorage', '$mdSidenav'];

function ToolbarController($state, Authentication, $rootScope, menuService, $sessionStorage, $mdSidenav) {
  var vm = this;
  vm.state = $state;
  vm.storage = $sessionStorage;
  vm.auth = Authentication;
  vm.toggleLeft = buildToggler('left');

  if (vm.storage.globals) {
    vm.username = vm.storage.globals.currentUser.username
  }

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }


  vm.goLogin = function() {
    $state.go('login');
  };

  vm.goUser = function() {
    $state.go('user');
  };

  vm.signout = function() {
    Authentication.clearCredentials();
    $state.go('login');
  };
}
