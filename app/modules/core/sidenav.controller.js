'use strict';

angular.module('andruclient').controller('SideNavController', SideNavController);

SideNavController.$inject = ['$state', 'principal', '$rootScope', 'menuService', 'Authentication', '$sessionStorage', '$mdSidenav', 'mdTheming'];

function SideNavController($state, principal, $rootScope, menuService, Authentication, $sessionStorage, $mdSidenav, mdTheming) {
  var vm = this;
  vm.storage = $sessionStorage;
  vm.auth = Authentication;
  vm.menu = menuService.getMenu('topbar');
  vm.toggleLeft = buildToggler('left');

  if (vm.storage.theme) {
    mdTheming.setDefaultTheme(vm.storage.theme);
  } else {
    vm.storage.theme = 'light';
    mdTheming.setDefaultTheme(vm.storage.theme);
  }
  vm.changeTheme = function() {
    vm.storage.theme = vm.storage.theme === 'light' ? 'dark' : 'light';
    mdTheming.setDefaultTheme(vm.storage.theme);
  };


  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

  // if (!vm.auth.isAuthenticated()) {
  //   $state.go('home')
  // }

  vm.goUser = function() {
    $state.go('user');
  };

  vm.signout = function() {
    Authentication.clearCredentials();
    $state.go('login');
  };

  vm.goLogin = function() {
    $state.go('login');
  };
}
