'use strict';

//Register a new controller for your module
angular.module('cubesperhour').controller('cubesperhourController', cubesperhourController);

//Inject dependencies
cubesperhourController.$inject = ['$state', 'principal','$scope','cubesperhourService'];

function cubesperhourController($state, principal,$scope,cubesperhourService) {
  //define a scope variable to bind to the DOM
  var vm = this;

  //Initialise variables
  $scope.startDate = new Date();
  $scope.endDate = new Date();
  $scope.maxDate = new Date();
  cubesperhourService.getPlants().then(function(response){
    $scope.plants = response.data;
  })

  $scope.generate = function(){
      if($scope.selectedType == "plant" && $scope.selectedTime == "day"){
        var toSend = {
          plant : $scope.selectedPlant,
          startDate : $scope.startDate,
          endDate : $scope.endDate
        };
        cubesperhourService.getCubesPerSitePerDay(toSend).then(function(response){
            $scope.cubes = response.data;
            cubesperhourService.getRunTimePerSitePerDay(toSend).then(function(response){
              $scope.runtime = response.data;
              for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
              {
                $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                $scope.cubes[i].total_runtime = $scope.runtime[i].Total_Runtime;
                $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
              }

            })
        })
      }
      else if($scope.selectedType == "type" && $scope.selectedTime == "day"){
        var toSend = {
          plant : $scope.selectedPlant,
          startDate : $scope.startDate,
          endDate : $scope.endDate,
          type : $scope.chosenType
        };

        if($scope.chosenType == 'Dozer'){
          cubesperhourService.getDozerPerDay(toSend).then(function(response){
            $scope.cubes = response.data;
            for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
            {

              $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
              $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
              $scope.cubes[i].total_runtime = parseFloat($scope.cubes[i].total_runtime).toFixed(0);
            }
          })
        }
        else{
          cubesperhourService.getCubesPerEquipmentPerDay(toSend).then(function(response){
              $scope.cubes = response.data;
              cubesperhourService.getRunTimePerTypePerDay(toSend).then(function(response){
                $scope.runtime = response.data;
                for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
                {
                  $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                  $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                  $scope.cubes[i].total_runtime = $scope.runtime[i].Total_Runtime;
                  $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                }

              })
          })
        }
      }
      else if($scope.selectedType == 'equipment' && $scope.selectedTime == 'day'){
        //FIX DATES AND GREY
        // var toSend = {
        //   equipment : $scope.selectedEquipment,
        //   type : $scope.chosenType,
        //   startDate : $scope.startDate,
        //   endDate : $scope.endDate
        // }
        // if($scope.chosenType=='Dozer'){
        //   cubesperhourService.getCubesPerEquipment(toSend).then(function(response){
        //     $scope.cubes = response.data;
        //   })
        // }
        // else{
        //   cubesperhourService.getCubesPerEquipment(toSend).then(function(response){
        //     $scope.cubes = response.data;
        //     cubesperhourService.getRunTimePerEquipmentPerDay(toSend).then(function(response){
        //       $scope.runtime = response.data;
        //       for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
        //       {
        //         $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
        //         $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
        //         $scope.cubes[i].total_runtime = $scope.runtime[i].Total_Runtime;
        //         $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
        //       }
        //     })
          })
        }
      }
  }

  $scope.getTypes = function(plant){
    cubesperhourService.getTypes(plant).then(function(response){
      $scope.types = response.data;
    })
  }

  $scope.getEquipment = function(selectedType,selectedPlant){
    cubesperhourService.getEquipments(selectedType,selectedPlant).then(function(response){
      $scope.equipments = response.data;
    })
  }








  // vm.hService = hoursanddowntimeService;
  // $scope.plants = [];
  // $scope.selectedPlant = {};
  // $scope.types = [];
  // $scope.selectedType = {};
  // $scope.equipments = [];
  // $scope.selectedEquipment = {};
  // $scope.downtimeArr = {data:[]};
  //
  //
  // //define a scope variable to bind to the DOM
  // init();
  //
  // $scope.generate = function(equipment){
  //   $scope.labels = [];
  //   $scope.series = ['Hours worked', 'Downtimes'];
  //   Chart.defaults.global.colors = [ '#0085CF', '#ff6347', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
  //   $scope.totalHoursWorked = 0;
  //   $scope.totalDowntime = 0;
  //
  //   $scope.data = [
  //     [],
  //     []
  //   ];
  //
  //   $scope.selected = [];
  //
  //   vm.hService.getHoursWorked(equipment).then(function(response){
  //     $scope.hours = response.data;
  //     vm.hService.getDowntimes(equipment).then(function(response){
  //       $scope.dt = response.data;
  //       var c = 1;
  //       for(var i=1; i < Object.keys($scope.hours).length+1; i++)
  //       {
  //         $scope.labels.push($scope.hours[i].Date);
  //         $scope.data[0].push($scope.hours[i].Total_Runtime);
  //         $scope.totalHoursWorked = $scope.totalHoursWorked + parseInt($scope.hours[i].Total_Runtime);
  //
  //         if($scope.dt[c].Date == $scope.hours[i].Date){
  //             $scope.data[1].push(($scope.dt[c].Delay/60).toFixed(2)*(-1));
  //             $scope.totalDowntime = $scope.totalDowntime + parseFloat($scope.dt[c].Delay/60);
  //             c++;
  //         }
  //         else {
  //           $scope.data[1].push(0);
  //         }
  //       }
  //
  //       for(var i = 0; i < $scope.data[1].length;i++){
  //         $scope.downtimeArr.data.push({val : ($scope.data[1][i])*-1});
  //       }
  //     })
  //   })
  //
  //
  //
  // }
  //
  // $scope.convertExcelDate = function(serial) {
  //    var utc_days  = Math.floor(serial - 25569);
  //    var utc_value = utc_days * 86400;
  //    var date_info = new Date(utc_value * 1000);
  //
  //    var fractional_day = serial - Math.floor(serial) + 0.0000001;
  //
  //    var total_seconds = Math.floor(86400 * fractional_day);
  //
  //    var seconds = total_seconds % 60;
  //
  //    total_seconds -= seconds;
  //
  //    var hours = Math.floor(total_seconds / (60 * 60));
  //    var minutes = Math.floor(total_seconds / 60) % 60;
  //
  //    return (date_info.getDate()+"/"+date_info.getMonth());
  // }
  //
  //
  // function init() {
  //   if (principal.isAuthenticated) {
  //     vm.isAuthor = principal.isInAnyRole($state.current.data.roles);
  //     //get all the plants on entering
  //     vm.hService.getPlants().then(function(response){
  //       $scope.plants = response.data
  //     })
  //   //werk aan rerouting na not auth state toe as hier kak is. Log vir nou.
  //   } else {
  //     $state.go('login')
  //   }
  // }
  //
  // $scope.getTypes = function(plant){
  //   vm.hService.getTypes(plant).then(function(response){
  //     $scope.types = response.data;
  //   })
  // }
  //
  // $scope.getEquipment = function(selectedType,selectedPlant){
  //   vm.hService.getEquipments(selectedType,selectedPlant).then(function(response){
  //     $scope.equipments = response.data;
  //   })
  // }
}
