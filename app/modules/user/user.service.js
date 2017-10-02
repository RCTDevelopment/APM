angular.module('user').service('UserService', userService);

function userService($http) {
  this.update = function(user) {
    return $http.post('angular/api/updateUser.php', user);
  }
  this.add = function(user) {
    return $http.post('angular/api/addUser.php', user);
  }
  // this.manage = function(user, action) {
  //   return $http.put('/dbpservice/user/manage?action=' + action, user)
  // }
  this.delete = function(user) {
    return $http.post('angular/api/deleteUser.php', user);
  }
  this.getAllRoles = function() {
    var roles = [{
      roleId: 1,
      name: 'ADMIN',
      description: 'Admin Rights'
    },
      {
        roleId: 2,
        name: 'MANAGER',
        description: 'View site reports'
      },
      {
        roleId: 3,
        name: 'DIRECTOR',
        description: 'View all report'
      }];
    return roles;
  }
}
