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

  this.getCubesPerSitePerMonth = function(request){
    return $http.post("angular/api/getCubesPerSitePerMonth.php",request);
  }

  this.getRunTimePerSitePerMonth = function(request){
    return $http.post("angular/api/getRunTimePerSitePerMonth.php",request);
  }

  this.getCubesPerSitePerYear = function(request){
    return $http.post("angular/api/getCubesPerSitePerYear.php",request);
  }

  this.getRunTimePerSitePerYear = function(request){
    return $http.post("angular/api/getRunTimePerSitePerYear.php",request);
  }

  this.getCubesPerSitePerHour = function(request){
    return $http.post("angular/api/getCubesPerSitePerHour.php",request);
  }

  this.getCubesPerTypePerDay = function(request){
    return $http.post("angular/api/getCubesPerTypePerDay.php",request);
  }

  this.getCubesPerTypePerMonth = function(request){
    return $http.post("angular/api/getCubesPerTypePerMonth.php",request);
  }

  this.getCubesPerTypePerYear = function(request){
    return $http.post("angular/api/getCubesPerTypePerYear.php",request);
  }

  this.getCubesPerTypePerHour = function(request){
    return $http.post("angular/api/getCubesPerTypePerHour.php",request);
  }

  this.getRunTimePerTypePerDay = function(request){
    return $http.post("angular/api/getRunTimePerTypePerDay.php",request);
  }

  this.getRunTimePerTypePerYear = function(request){
    return $http.post("angular/api/getRunTimePerTypePerYear.php",request);
  }

  this.getRunTimePerTypePerMonth = function(request){
    return $http.post("angular/api/getRunTimePerTypePerMonth.php",request);
  }


  this.getTypes = function(selectedPlant){
    return $http.post("angular/api/getTypes.php",{plant : selectedPlant});
  }

  this.getDozerPerDay = function(request){
    return $http.post("angular/api/getCubesPerDozerPerDay.php",request);
  }

  this.getDozerPerMonth = function(request){
    return $http.post("angular/api/getCubesPerDozerPerMonth.php",request);
  }

  this.getDozerPerYear = function(request){
    return $http.post("angular/api/getCubesPerDozerPerYear.php",request);
  }

  this.getDozerPerHour = function(request){
    return $http.post("angular/api/getCubesPerDozerPerHour.php",request);
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

  this.getCubesPerEquipmentPerMonth = function(request){
    return $http.post("angular/api/getCubesPerEquipmentPerMonth.php",request);
  }

  this.getCubesPerEquipmentPerYear = function(request){
    return $http.post("angular/api/getCubesPerEquipmentPerYear.php",request);
  }

  this.getCubesPerEquipmentPerHour = function(request){
    return $http.post("angular/api/getCubesPerEquipmentPerHour.php",request);
  }

  this.getRunTimePerEquipmentPerDay = function(request){
    return $http.post("angular/api/getRunTimePerEquipmentPerDay.php",request);
  }

  this.getRunTimePerEquipmentPerMonth = function(request){
    return $http.post("angular/api/getRunTimePerEquipmentPerMonth.php",request);
  }

  this.getRunTimePerEquipmentPerYear = function(request){
    return $http.post("angular/api/getRunTimePerEquipmentPerYear.php",request);
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
