angular.module('userManagement').service('UserManagementService', UserManagementService);

function UserManagementService($http) {
  this.getAllUsers = function() {
    return $http.get('/dbpservice/user/get');
  }
}
