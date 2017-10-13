angular.module('hoursanddowntime').service('hoursanddowntimeService', hoursanddowntimeService);

function hoursanddowntimeService($http) {
  // this.getHoursWorked = function(equipment){
  //   return $http.post("angular/api/getHoursWorked.php",{Equipment:parseInt(equipment)})
  // }
  //
  // this.getDowntimes = function(equipment){
  //   return  $http.post('angular/api/getDownTime.php',{Equipment:parseInt(equipment)})
  // }
  this.getHoursAndDowntime = function(type,time,start,end,plant,chosenType,equipments,model){
    var typenr = 0;
    var timenr = 0;
    switch (type) {
      case "plant":
        typenr = 1;
        break;
      case "type":
        typenr = 2;
        break;
      case "equipment":
        typenr = 3;
        break;
      case 'model':
        typenr = 4;
        break;
      default:
        return "mistake";
    }
    switch (time) {
      case "day":
        timenr = 1;
        break;
      case "month":
        timenr = 2;
        break;
      case "year":
        timenr = 3;
        break;
      default:
        return "mistake";
    }
    var request = {
      'typenr' : typenr,
      'timenr' : timenr,
      'startDate' : start,
      'endDate' : end,
      'plant' : plant,
      'type' : chosenType,
      'equipments' : equipments,
      'model' : model
    }
    return $http.post("angular/api/hoursAndDowntime.php",request);
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
