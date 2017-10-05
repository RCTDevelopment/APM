'use strict';

//Register the Openvpn as a sub module.
angular.module('assetregister', []).config(routeConfig);

//We need to configure our routes/states. To do that we need the package stateProvider. Inject that.
routeConfig.$inject = ['$stateProvider'];

//The function that calls the configuration
function routeConfig($stateProvider) {
  //Register Openvpn's state.
  $stateProvider.state('assetregister', {
    url: '/assetregister',
    templateUrl: 'angular/app/modules/assetregister/assetregister.template.html',
    controller: 'assetregisterController',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Asset Register',
      pageDescription: 'Manage assets',
      roles: ['ADMIN']
    }
  })
}
;
