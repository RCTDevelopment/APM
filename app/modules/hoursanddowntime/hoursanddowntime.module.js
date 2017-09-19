'use strict';

//Register the Openvpn as a sub module.
angular.module('hoursanddowntime', []).config(routeConfig);

//We need to configure our routes/states. To do that we need the package stateProvider. Inject that.
routeConfig.$inject = ['$stateProvider'];

//The function that calls the configuration
function routeConfig($stateProvider) {
  //Register Openvpn's state.
  $stateProvider.state('hoursanddowntime', {
    url: '/hoursanddowntime',
    templateUrl: 'angular/app/modules/hoursanddowntime/hoursanddowntime.template.html',
    controller: 'hoursanddowntimeController',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Hours vs Downtime',
      pageDescription: 'Compare hours and downtime of equipment',
      roles: ['ADMIN', 'MANAGER','DIRECTOR']
    }
  })
}
;
