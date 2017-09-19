angular.module('userManagement').service('UserManagementService', UserManagementService);

function UserManagementService($http) {
  this.getAllUsers = function() {
    return $http.get('/angular/api/getAllUsers.php');
  }

  this.getPlants = function(){
    return $http.get('/angular/api/getPlants.php');
  }
}
