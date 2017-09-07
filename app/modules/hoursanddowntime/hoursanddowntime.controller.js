'use strict';

//Register a new controller for your module openvpn
angular.module('hoursanddowntime').controller('hoursanddowntimeController', hoursanddowntimeController);

//Inject dependencies
hoursanddowntimeController.$inject = ['$state', 'principal','$scope','hoursanddowntimeService'];

function hoursanddowntimeController($state, principal,$scope,hoursanddowntimeService) {
  //define a scope variable to bind to the DOM
  var vm = this;
  vm.hService = hoursanddowntimeService;



  //define a scope variable to bind to the DOM
  init();

  $scope.labels = [];
  $scope.series = ['Hours worked', 'Downtimes'];

  $scope.data = [
    [],
    []
  ];

  $scope.selected = [];

  vm.hService.getHoursWorked().then(function(response){
    $scope.hours = response.data;
    angular.forEach($scope.hours,function(obj){
      $scope.labels.push($scope.convertExcelDate(obj.Date));
      $scope.data[0].push(obj.Total_Runtime);
    })
  })

  vm.hService.getDowntimes().then(function(response){
    $scope.dt = response.data;
    angular.forEach($scope.dt,function(obj) {
      $scope.data[1].push((obj.Delay/60).toFixed(2)*(-1));
    })
  })

console.log($scope.data[0])

    $scope.convertExcelDate = function(serial) {
     var utc_days  = Math.floor(serial - 25569);
     var utc_value = utc_days * 86400;
     var date_info = new Date(utc_value * 1000);

     var fractional_day = serial - Math.floor(serial) + 0.0000001;

     var total_seconds = Math.floor(86400 * fractional_day);

     var seconds = total_seconds % 60;

     total_seconds -= seconds;

     var hours = Math.floor(total_seconds / (60 * 60));
     var minutes = Math.floor(total_seconds / 60) % 60;

     return (date_info.getDate()+"/"+date_info.getMonth());
  }


  function init() {
    if (principal.isAuthenticated) {
      vm.isAuthor = principal.isInAnyRole($state.current.data.roles);
    //werk aan rerouting na not auth state toe as hier kak is. Log vir nou.
    } else {
      $state.go('login')
    }
  }
}
