'use strict';

//Register a new controller for your module
angular.module('cubesperhour').controller('cubesperhourController', cubesperhourController);

//Inject dependencies
cubesperhourController.$inject = ['$state', 'principal','$scope','cubesperhourService','DialogService'];

function cubesperhourController($state, principal,$scope,cubesperhourService,DialogService) {
  //define a scope variable to bind to the DOM
  var vm = this;

  //Initialise variables
  $scope.startDate = new Date();
  $scope.endDate = new Date();
  $scope.maxDate = new Date();
  $scope.selectedPlant = null;
  cubesperhourService.getPlants().then(function(response){
    $scope.plants = response.data;
  })

  $scope.generate = function(ev){
    if(!$scope.selectedType){
        DialogService.showAlert(ev, 'Item', 'Please selected an item', 'Re enter');
    }
    else if (!$scope.selectedTime){
      DialogService.showAlert(ev, 'Times', 'Please select a time scale', 'Re enter');
    }
    else if ($scope.selectedType == "plant" && !$scope.selectedPlant)
    {
        DialogService.showAlert(ev, 'Plant', 'Please selected a plant', 'Re enter');
    }
    else{
      $scope.hours =  [];
      $scope.series = ['Cubes per ' + $scope.selectedTime];
      $scope.labels = [];
      $scope.data = [[]];
      Chart.defaults.global.colors = [ '#0085CF', '#ff6347', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
      if($scope.selectedType == "plant"){
        if($scope.selectedTime == "day"){
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
                  if($scope.cubes[i].total_runtime == 0){
                    $scope.cubes[i].cubes_per_runtime = 0;
                  }
                  else {
                    $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                  }
                  $scope.labels.push($scope.cubes[i].Date)
                  $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
                }

              })
          })
        }
        else if ($scope.selectedTime == "hour"){
          var toSend = {
            plant : $scope.selectedPlant,
            startDate : $scope.startDate,
          };
          cubesperhourService.getCubesPerSitePerHour(toSend).then(function(response){
              $scope.cubes = response.data;
              for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
              {
                $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                $scope.labels.push($scope.cubes[i].Time)
                $scope.data[0].push($scope.cubes[i].Cubes);
              }
          })
        }
        else if($scope.selectedTime == "month"){
          var toSend = {
            plant : $scope.selectedPlant,
            startDate : $scope.fromMonth,
            endDate : $scope.toMonth
          };
          cubesperhourService.getCubesPerSitePerMonth(toSend).then(function(response){
              $scope.cubes = response.data;
              cubesperhourService.getRunTimePerSitePerMonth(toSend).then(function(response){
                $scope.runtime = response.data;
                for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
                {
                  $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                  $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                  $scope.cubes[i].total_runtime = $scope.runtime[i].Total_Runtime;
                  if($scope.cubes[i].total_runtime == 0){
                    $scope.cubes[i].cubes_per_runtime = 0;
                  }
                  else {
                    $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                  }
                  $scope.labels.push($scope.cubes[i].Date)
                  $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
                }

              })
          })
        }
        else if($scope.selectedTime == 'year'){
          var toSend = {
            plant : $scope.selectedPlant,
            startDate : $scope.fromYear,
            endDate : $scope.toYear
          };
          cubesperhourService.getCubesPerSitePerYear(toSend).then(function(response){
              $scope.cubes = response.data;
              cubesperhourService.getRunTimePerSitePerYear(toSend).then(function(response){
                $scope.runtime = response.data;
                for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
                {
                  $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                  $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                  $scope.cubes[i].total_runtime = $scope.runtime[i].Total_Runtime;
                  if($scope.cubes[i].total_runtime == 0){
                    $scope.cubes[i].cubes_per_runtime = 0;
                  }
                  else {
                    $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                  }
                  $scope.labels.push($scope.cubes[i].Date)
                  $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
                }

              })
          })
        }
      }
      else if($scope.selectedType == "type"){
        if($scope.selectedTime == "day"){
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
                if($scope.cubes[i].total_runtime == 0){
                  $scope.cubes[i].cubes_per_runtime = 0;
                }
                else {
                  $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                }
                $scope.labels.push($scope.cubes[i].Date)
                $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
              }
            })
          }
        else{
          cubesperhourService.getCubesPerTypePerDay(toSend).then(function(response){
              $scope.cubes = response.data;
              cubesperhourService.getRunTimePerTypePerDay(toSend).then(function(response){
                $scope.runtime = response.data;
                for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
                {
                  $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                  $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                  $scope.cubes[i].total_runtime = $scope.runtime[i].Total_Runtime;
                  if($scope.cubes[i].total_runtime == 0){
                    $scope.cubes[i].cubes_per_runtime = 0;
                  }
                  else {
                    $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                  }
                  $scope.labels.push($scope.cubes[i].Date)
                  $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
                }

              })
            })
          }
        }
        else if($scope.selectedTime  == 'hour'){
          var toSend = {
            plant : $scope.selectedPlant,
            startDate : $scope.startDate,
            type : $scope.chosenType
          };

          if($scope.chosenType == 'Dozer'){
            cubesperhourService.getDozerPerHour(toSend).then(function(response){
              $scope.cubes = response.data;
              for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
              {

                $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                if($scope.cubes[i].total_runtime == 0){
                  $scope.cubes[i].cubes_per_runtime = 0;
                }
                else {
                  $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                }
                $scope.labels.push($scope.cubes[i].Time)
                $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
              }
            })
          }
          else{
            cubesperhourService.getCubesPerTypePerHour(toSend).then(function(response){
              $scope.cubes = response.data;
              for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
              {
                $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                $scope.labels.push($scope.cubes[i].Time)
                $scope.data[0].push($scope.cubes[i].Cubes);
              }
            })
          }
        }
        else if ($scope.selectedTime == "month"){
          var toSend = {
            plant : $scope.selectedPlant,
            startDate : $scope.fromMonth,
            endDate : $scope.toMonth,
            type : $scope.chosenType
          };

          if($scope.chosenType == 'Dozer'){
            cubesperhourService.getDozerPerMonth(toSend).then(function(response){
              $scope.cubes = response.data;
              for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
              {
                $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                if($scope.cubes[i].total_runtime == 0){
                  $scope.cubes[i].cubes_per_runtime = 0;
                }
                else {
                  $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                }
                $scope.labels.push($scope.cubes[i].Date)
                $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
              }
            })
          }
        else{
          cubesperhourService.getCubesPerTypePerMonth(toSend).then(function(response){
              $scope.cubes = response.data;
              cubesperhourService.getRunTimePerTypePerMonth(toSend).then(function(response){
                $scope.runtime = response.data;
                for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
                {
                  $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                  $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                  $scope.cubes[i].total_runtime = $scope.runtime[i].Total_Runtime;
                  if($scope.cubes[i].total_runtime == 0){
                    $scope.cubes[i].cubes_per_runtime = 0;
                  }
                  else {
                    $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                  }
                  $scope.labels.push($scope.cubes[i].Date)
                  $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
                }
              })
            })
          }
        }
        else if($scope.selectedTime == "year"){
          var toSend = {
            plant : $scope.selectedPlant,
            startDate : $scope.fromYear,
            endDate : $scope.toYear,
            type : $scope.chosenType
          };

          if($scope.chosenType == 'Dozer'){
            cubesperhourService.getDozerPerYear(toSend).then(function(response){
              $scope.cubes = response.data;
              for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
              {
                $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                if($scope.cubes[i].total_runtime == 0){
                  $scope.cubes[i].cubes_per_runtime = 0;
                }
                else {
                  $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                }
                $scope.labels.push($scope.cubes[i].Date)
                $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
              }
            })
          }
        else{
          cubesperhourService.getCubesPerTypePerYear(toSend).then(function(response){
              $scope.cubes = response.data;
              cubesperhourService.getRunTimePerTypePerYear(toSend).then(function(response){
                $scope.runtime = response.data;
                for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
                {
                  $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                  $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                  $scope.cubes[i].total_runtime = $scope.runtime[i].Total_Runtime;
                  if($scope.cubes[i].total_runtime == 0){
                    $scope.cubes[i].cubes_per_runtime = 0;
                  }
                  else {
                    $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                  }
                  $scope.labels.push($scope.cubes[i].Date)
                  $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
                }
              })
            })
          }
        }
      }
      else if($scope.selectedType == 'equipment'){
        $scope.data = [];
        if($scope.selectedTime == 'day'){
          var toSend = {
            equipment : $scope.selectedEquipments,
            type : $scope.chosenType,
            startDate : $scope.startDate,
            endDate : $scope.endDate
          }
          if($scope.chosenType=='Dozer'){
            cubesperhourService.getCubesPerEquipment(toSend).then(function(response){
              $scope.cubes = response.data;
              for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
              {
                if($scope.cubes[i].total_runtime == 0){
                  $scope.cubes[i].cubes_per_runtime = 0;
                }
                else {
                  $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                }
                $scope.labels.push($scope.cubes[i].Date)
                $scope.data[0].push($scope.cubes[i].cubes_per_runtime);

              }
            })
          }
          else{
            cubesperhourService.getCubesPerEquipment(toSend).then(function(response){
              $scope.cubes = response.data;
              cubesperhourService.getRunTimePerEquipmentPerDay(toSend).then(function(response){
                $scope.runtime = response.data;
                for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
                {
                    $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                    $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                    $scope.cubes[i].total_runtime = $scope.runtime[i].Total_Runtime;
                    if($scope.cubes[i].total_runtime == 0){
                      $scope.cubes[i].cubes_per_runtime = 0;
                    }
                    else {
                      $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                    }
                    $scope.labels.push($scope.cubes[i].Date)
                    $scope.data[0].push($scope.cubes[i].cubes_per_runtime);

                }
              })
            })
          }
        }
        else if($scope.selectedTime == 'hour'){
          var toSend = {
            equipment : $scope.selectedEquipments,
            type : $scope.chosenType,
            startDate : $scope.startDate,
          }
          if($scope.chosenType=='Dozer'){
            cubesperhourService.getCubesPerEquipmentPerHour(toSend).then(function(response){
              $scope.cubes = response.data;
              for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
              {

                  $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                  $scope.labels.push($scope.cubes[i].Time)
                  $scope.data[0].push($scope.cubes[i].Cubes);

              }
            })
          }
          else{
            cubesperhourService.getCubesPerEquipmentPerHour(toSend).then(function(response){
              $scope.cubes = response.data;
              for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
              {

                  $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                  $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                  $scope.labels.push($scope.cubes[i].Time)
                  $scope.data[0].push($scope.cubes[i].Cubes);

              }
            })
          }
        }
        else if($scope.selectedTime == "month"){
          var toSend = {
            equipment : $scope.selectedEquipments,
            type : $scope.chosenType,
            startDate : $scope.fromMonth,
            endDate : $scope.toMonth
          }
          if($scope.chosenType=='Dozer'){
            cubesperhourService.getCubesPerEquipmentPerMonth(toSend).then(function(response){
              $scope.cubes = response.data;
              for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
              {

                if($scope.cubes[i].total_runtime == 0){
                  $scope.cubes[i].cubes_per_runtime = 0;
                }
                else {
                  $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                }
                $scope.labels.push($scope.cubes[i].Date)
                $scope.data[0].push($scope.cubes[i].cubes_per_runtime);

              }
            })
          }
          else{
            cubesperhourService.getCubesPerEquipmentPerMonth(toSend).then(function(response){
              $scope.cubes = response.data;
              cubesperhourService.getRunTimePerEquipmentPerMonth(toSend).then(function(response){
                $scope.runtime = response.data;
                for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
                {

                    $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                    $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                    $scope.cubes[i].total_runtime = $scope.runtime[i].Total_Runtime;
                    if($scope.cubes[i].total_runtime == 0){
                      $scope.cubes[i].cubes_per_runtime = 0;
                    }
                    else {
                      $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                    }
                    $scope.labels.push($scope.cubes[i].Date)
                    $scope.data[0].push($scope.cubes[i].cubes_per_runtime);

                }
              })
            })
          }
        }
        else if($scope.selectedTime =='year'){
          var toSend = {
            equipment : $scope.selectedEquipments,
            type : $scope.chosenType,
            startDate : $scope.fromYear,
            endDate : $scope.toYear
          }
          if($scope.chosenType=='Dozer'){
            cubesperhourService.getCubesPerEquipmentPerYear(toSend).then(function(response){
              $scope.cubes = response.data;
              for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
              {

                if($scope.cubes[i].total_runtime == 0){
                  $scope.cubes[i].cubes_per_runtime = 0;
                }
                else {
                  $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                }
                $scope.labels.push($scope.cubes[i].Date)
                $scope.data[0].push($scope.cubes[i].cubes_per_runtime);

              }
            })
          }
          else{
            cubesperhourService.getCubesPerEquipmentPerYear(toSend).then(function(response){
              $scope.cubes = response.data;
              cubesperhourService.getRunTimePerEquipmentPerYear(toSend).then(function(response){
                $scope.runtime = response.data;
                for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
                {

                    $scope.cubes[i].Cubes = parseFloat($scope.cubes[i].Cubes).toFixed(0);
                    $scope.cubes[i].Tons = parseFloat($scope.cubes[i].Tons).toFixed(0);
                    $scope.cubes[i].total_runtime = $scope.runtime[i].Total_Runtime;
                    if($scope.cubes[i].total_runtime == 0){
                      $scope.cubes[i].cubes_per_runtime = 0;
                    }
                    else {
                      $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
                    }
                    $scope.labels.push($scope.cubes[i].Date)
                    $scope.data[0].push($scope.cubes[i].cubes_per_runtime);

                }
              })
            })
          }
        }
      }
    }

    }


  $scope.getTypes = function(plant){
    $scope.types = [{
      type: 'Dozer'
    },
    {
      type: 'Excavator'
    },
    {
      type: 'Truck'
    }
    ]
    $scope.equipments = [];


  }

  $scope.getEquipment = function(selectedType,selectedPlant){
    $scope.equipments = [];
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
