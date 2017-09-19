'use strict';

//Register the user management as a sub module.
angular.module('userManagement', []).config(routeConfig);

//We need to configure our routes/states. To do that we need the package stateProvider. Inject that.
routeConfig.$inject = ['$stateProvider'];

//The function that calls the configuration
function routeConfig($stateProvider) {
  //Register user management's state.
  $stateProvider.state('userManagement', {
    url: '/userManagement',
    templateUrl: 'angular/app/modules/user-management/user-management.template.html',
    controller: 'UserManagementController',
    controllerAs: 'vm',
    data: {
      pageTitle: 'User Management',
      pageDescription: 'Manage Users of the platform',
      roles: ['ADMIN']
    }
  })
}
