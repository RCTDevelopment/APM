'use strict';

//Register the Openvpn as a sub module.
angular.module('cubesperhour', []).config(routeConfig);

//We need to configure our routes/states. To do that we need the package stateProvider. Inject that.
routeConfig.$inject = ['$stateProvider'];

//The function that calls the configuration
function routeConfig($stateProvider) {
  //Register Openvpn's state.
  $stateProvider.state('cubesperhour', {
    url: '/cubesperhour',
    templateUrl: 'angular/app/modules/cubesperhour/cubesperhour.template.html',
    controller: 'cubesperhourController',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Cubes per hour',
      pageDescription: 'Calculate the total cubes devided by total runtime',
      roles: ['ADMIN', 'MANAGER','DIRECTOR']
    }
  })
}
;
