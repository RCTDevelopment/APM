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

  cubesperhourService.getModels().then(function(response){
    $scope.models = response.data;
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

            $scope.selectedFrom = $scope.fromMonth;
            $scope.selectedTo = $scope.toMonth;
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

            $scope.selectedFrom = $scope.fromMonth;
            $scope.selectedTo = $scope.toMonth;
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
                // $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
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
      else if($scope.selectedType == 'model'){
        //BIG FUCKUP HERE
        if($scope.selectedTime == 'day'){
          $scope.selectedFrom = $scope.startDate;
          $scope.selectedTo = $scope.endDate;
        }
        else if($scope.selectedTime == 'month'){

            $scope.selectedFrom = $scope.fromMonth;
            $scope.selectedTo = $scope.toMonth;


        }
        else if($scope.selectedTime =='year'){
          $scope.selectedFrom = $scope.fromYear;
          $scope.selectedTo = $scope.toYear;
        }
        else if($scope.selectedTime =='hour'){
          $scope.selectedFrom = $scope.startDate;
          $scope.selectedTo = null;
        }
        $scope.timenr = 0;
        switch ($scope.selectedTime) {
            case "day":
              $scope.timenr = 1;
              break;
            case "month":
              $scope.timenr = 2;
              break;
            case "year":
              $scope.timenr = 3;
              break;
            case "hour":
              $scope.timenr =4;
              break;
            default:
              return "mistake";
          }

          cubesperhourService.getCubesPerModel($scope.timenr,$scope.selectedModel,$scope.selectedPlant,$scope.selectedFrom,$scope.selectedTo).then(function(response){
            $scope.cubes = response.data;
            for(var i=1; i < Object.keys($scope.cubes).length+1; i++)
            {
              if(!$scope.cubes[i].Cubes){
                $scope.cubes[i].Cubes = 0;
              }
              if(!$scope.cubes[i].Tons){
                $scope.cubes[i].Tons = 0;
              }
              if($scope.cubes[i].total_runtime == 0){
                $scope.cubes[i].cubes_per_runtime = 0;
              }
              else {
                $scope.cubes[i].cubes_per_runtime = ($scope.cubes[i].Cubes/$scope.cubes[i].total_runtime).toFixed(0);
              }
              $scope.labels.push($scope.cubes[i].Date)
              if($scope.selectedTime != 'hour'){
                  $scope.data[0].push($scope.cubes[i].cubes_per_runtime);
              }
              else {
                $scope.data[0].push($scope.cubes[i].Cubes);
              }

            }
          })
      }
      else if($scope.selectedType == 'equipment'){
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

            $scope.selectedFrom = $scope.fromMonth;
            $scope.selectedTo = $scope.toMonth;
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

  $scope.getEquipment = function(chosenModel,selectedPlant,chosenType){
    $scope.selectedEquipment = null;
    cubesperhourService.getEquipments(chosenModel,selectedPlant,chosenType).then(function(response){
      $scope.equipments = response.data;
    })
  }

  $scope.getModelsPerType = function(selectedType,selectedPlant){
    cubesperhourService.getModelsPerType(selectedType,selectedPlant).then(function(response){
      $scope.modelsPerType = response.data;
    })
  }
}
