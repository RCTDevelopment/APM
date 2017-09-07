'use strict';
angular.module('home').controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$sessionStorage'];

function HomeController($scope, $state, Authentication, menuService, $sessionStorage) {
  var vm = this;
  vm.storage = $sessionStorage;
  vm.auth = Authentication;
  vm.menu = menuService.getMenu('topbar');

  init();

  function init() {
  //  if (!vm.auth.isAuthenticated()) {
    //  $state.go('login')
  //  } else {
    vm.user = vm.storage.globals.currentUser;
  //  }
  }
}
