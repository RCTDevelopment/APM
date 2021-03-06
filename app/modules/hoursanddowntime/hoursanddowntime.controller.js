'use strict';

//Register a new controller for your module openvpn
angular.module('hoursanddowntime').controller('hoursanddowntimeController', hoursanddowntimeController);

//Inject dependencies
hoursanddowntimeController.$inject = ['$state', 'principal','$scope','hoursanddowntimeService','DialogService'];

function hoursanddowntimeController($state, principal,$scope,hoursanddowntimeService,DialogService) {
  //define a scope variable to bind to the DOM
  var vm = this;
  vm.hService = hoursanddowntimeService;
  $scope.plants = [];
  $scope.types = [];
  $scope.selectedType = {};
  $scope.equipments = [];
  $scope.selectedEquipment = {};
  $scope.selectedModel = null;
  $scope.downtimeArr = {data:[]};
  $scope.selectedPlant = null;
  $scope.selectedFrom = null;
  $scope.selectedTo = null;

  init();


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
    else if($scope.selectedTime == "month" && parseInt($scope.fromMonth) > parseInt($scope.toMonth)){
        DialogService.showAlert(ev, 'Months', 'Month values selected are invalid', 'Re enter');
    }
    else {
      $scope.series = ['Hours worked', 'Downtimes'];
      $scope.labels = [];
      $scope.graphLabels = [];
      $scope.data = [[],[]];
      Chart.defaults.global.colors = [ '#0085CF', '#ff6347', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
      $scope.totalHoursWorked = 0;
      $scope.totalDowntime = 0;
      if($scope.selectedTime == 'day'){
        $scope.selectedFrom = $scope.startDate;
        $scope.selectedTo = $scope.endDate;
      }
      else if($scope.selectedTime == 'month'){
        if($scope.selectedFrom > $scope.selectedTo){
          DialogService.showAlert(ev, 'Month', 'The month values are invalid', 'Re enter');
        }
        else{
          $scope.selectedFrom = $scope.fromMonth;
          $scope.selectedTo = $scope.toMonth;
        }

      }
      else if($scope.selectedTime =='year'){
        $scope.selectedFrom = $scope.fromYear;
        $scope.selectedTo = $scope.toYear;
      }
      vm.hService.getHoursAndDowntime($scope.selectedType,$scope.selectedTime,$scope.selectedFrom,$scope.selectedTo,$scope.selectedPlant,$scope.chosenType,$scope.selectedEquipment,$scope.selectedModel).then(function(response){
        if(response.data.length == 0){
            DialogService.showAlert(ev, 'No Data', 'No data was found for the request', 'Re enter');
        }
        else {
          $scope.hours = response.data;
          for(var i=1; i < Object.keys($scope.hours).length+1; i++)
          {
            $scope.labels.push({'Date' : $scope.hours[i].Date});
            $scope.graphLabels.push($scope.hours[i].Date);
            if($scope.hours[i].Total_Runtime){
              $scope.data[0][i-1] = $scope.hours[i].Total_Runtime;
            }
            else {
              $scope.data[0][i-1] = 0;
              $scope.hours[i].Total_Runtime = 0;
            }
            if($scope.hours[i].Delay){
              $scope.data[1][i-1] = $scope.hours[i].Delay*-1;
            }else {
              $scope.data[1][i-1] = 0;
              $scope.hours[i].Delay = 0;
            }
            $scope.totalHoursWorked += parseInt($scope.hours[i].Total_Runtime);
            $scope.totalDowntime += $scope.hours[i].Delay;
          }
        }
      })
    }
  }

  function init() {
    if (principal.isAuthenticated) {
      vm.isAuthor = principal.isInAnyRole($state.current.data.roles);
      //get all the plants on entering
      vm.hService.getPlants().then(function(response){
        $scope.plants = response.data
      })
      $scope.startDate = new Date();
      $scope.endDate = new Date();
      $scope.maxDate = new Date();
      vm.hService.getModels().then(function(response){
        $scope.models = response.data;
      })
    //werk aan rerouting na not auth state toe as hier kak is. Log vir nou.
    } else {
      $state.go('login')
    }
  }

  $scope.getTypes = function(plant){
    vm.hService.getTypes(plant).then(function(response){
      $scope.types = response.data;
    })
  }

  $scope.getEquipment = function(chosenModel,selectedPlant,chosenType){
    $scope.selectedEquipment = null;
    vm.hService.getEquipments(chosenModel,selectedPlant,chosenType).then(function(response){
      $scope.equipments = response.data;
    })
  }

  $scope.getModelsPerType = function(selectedType,selectedPlant){
    vm.hService.getModelsPerType(selectedType,selectedPlant).then(function(response){
      $scope.modelsPerType = response.data;
    })
  }

}
