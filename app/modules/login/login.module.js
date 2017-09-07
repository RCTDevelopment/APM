'use strict';

//Register the Login as a sub module.
angular.module('login', []).config(routeConfig);

//We need to configure our routes/states. To do that we need the package stateProvider. Inject that.
routeConfig.$inject = ['$stateProvider'];

//The function that calls the configuration
function routeConfig($stateProvider) {
  //Register Docking Station's state.
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'angular/app/modules/login/login.template.html',
    controller: 'LoginController',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Login',
      pageDescription: 'Login to the website',
      roles: ['ADMIN', 'USER_ADMIN', 'REQUESTER', 'APPROVER']
    }
  })
}
