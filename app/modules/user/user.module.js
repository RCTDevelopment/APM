'use strict';

//Register the user as a sub module .
angular.module('user', []).config(routeConfig);

//We need to configure our routes/states. To do that we need the package stateProvider. Inject that.
routeConfig.$inject = ['$stateProvider'];

//The function that calls the configuration
function routeConfig($stateProvider) {
  //Register user's state.
  $stateProvider.state('user', {
    url: '/user',
    templateUrl: 'angular/app/modules/user/user.template.html',
    controller: 'UserController',
    controllerAs: 'vm',
    data: {
      pageTitle: 'User',
      pageDescription: 'User account information',
      roles: ['ADMIN', 'USER_ADMIN', 'REQUESTER', 'APPROVER']
    }
  })
}
;
