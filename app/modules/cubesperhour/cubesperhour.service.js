angular.module('cubesperhour').service('cubesperhourService', cubesperhourService);

function cubesperhourService($http) {
  // this.getHoursWorked = function(equipment){
  //   return $http.post("angular/api/getHoursWorked.php",{Equipment:parseInt(equipment)})
  // }
  //
  // this.getDowntimes = function(equipment){
  //   return  $http.post('angular/api/getDownTime.php',{Equipment:parseInt(equipment)})
  // }
  //
  this.getPlants = function(){
    return $http.post("angular/api/getPlants.php");
  }

  this.getCubesPerSitePerDay = function(request){
    return $http.post("angular/api/getCubesPerSitePerDay.php",request);
  }

  this.getRunTimePerSitePerDay = function(request){
    return $http.post("angular/api/getRunTimePerSitePerDay.php",request);
  }

  this.getCubesPerTypePerDay = function(request){
    return $http.post("angular/api/getCubesPerTypePerDay.php",request);
  }

  this.getRunTimePerTypePerDay = function(request){
    return $http.post("angular/api/getRunTimePerTypePerDay.php",request);
  }


  this.getTypes = function(selectedPlant){
    return $http.post("angular/api/getTypes.php",{plant : selectedPlant});
  }

  this.getDozerPerDay = function(request){
    return $http.post("angular/api/getCubesPerDozerPerDay.php",request);
  }

  this.getEquipments = function(selectedType,selectedPlant){
    var toSend = {
      type : selectedType,
      plant : selectedPlant
    }
    return $http.post("angular/api/getEquipment.php", toSend);
  }

  this.getCubesPerEquipment = function(request){
    return $http.post("angular/api/getCubesPerEquipmentPerDay.php",request);
  }

  this.getRunTimePerEquipmentPerDay = function(request){
    return $http.post("angular/api/getRunTimePerEquipmentPerDay.php",request);
  }
  //
  // this.getEquipments = function(selectedType,selectedPlant){
  //   var toSend = {
  //     type : selectedType,
  //     plant : selectedPlant
  //   }
  //   return $http.post("angular/api/getEquipment.php", toSend);
  // }
}
