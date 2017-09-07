'use strict';

//Register the home as a sub module.
angular.module('home', [])
  .config(routeConfig);

//We need to configure our routes/states. To do that we need the package stateProvider. Inject that.
routeConfig.$inject = ['$stateProvider'];

//The function that calls the configuration
function routeConfig($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeController',
    controllerAs: 'vm',
    templateUrl: 'angular/app/modules/home/home.template.html',
    data: {
      pageTitle: 'Dashboard',
      pageDescription: 'The main navigation screen',
      roles: ['ADMIN', 'USER_ADMIN', 'REQUESTER', 'APPROVER']
    }
  });
}
