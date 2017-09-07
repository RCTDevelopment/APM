angular.module('hoursanddowntime').service('hoursanddowntimeService', hoursanddowntimeService);

function hoursanddowntimeService($http) {
  this.getHoursWorked = function(){
    return $http.post("angular/api/getHoursWorked.php",{Equipment:parseInt(2867)})
  }

  this.getDowntimes = function(){
    return  $http.post('angular/api/getDownTime.php',{Equipment:parseInt(2867)})
  }

}
