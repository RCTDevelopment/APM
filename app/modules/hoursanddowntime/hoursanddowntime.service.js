angular.module('hoursanddowntime').service('hoursanddowntimeService', hoursanddowntimeService);

function hoursanddowntimeService($http) {
  this.getHoursWorked = function(equipment){
    return $http.post("angular/api/getHoursWorked.php",{Equipment:parseInt(equipment)})
  }

  this.getDowntimes = function(equipment){
    return  $http.post('angular/api/getDownTime.php',{Equipment:parseInt(equipment)})
  }

  this.getPlants = function(){
    return $http.post("angular/api/getPlants.php");
  }

  this.getTypes = function(selectedPlant){
    return $http.post("angular/api/getTypes.php",{plant : selectedPlant});
  }

  this.getEquipments = function(selectedType,selectedPlant){
    var toSend = {
      type : selectedType,
      plant : selectedPlant
    }
    return $http.post("angular/api/getEquipment.php", toSend);
  }
}
