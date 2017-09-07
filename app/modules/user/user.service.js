angular.module('user').service('UserService', userService);

function userService($http) {
  this.update = function(user) {
    return $http.put('/dbpservice/user/update', user);
  }
  this.add = function(user) {
    return $http.post('/dbpservice/user/create', user);
  }
  this.manage = function(user, action) {
    return $http.put('/dbpservice/user/manage?action=' + action, user)
  }
  this.delete = function(user) {
    var conf = {
      data: user,
      headers: {
        'Content-Type': "application/json;charset=utf-8"
      }
    }
    return $http.delete('/dbpservice/user/delete', conf);
  }
  this.getAllRoles = function() {
    var roles = [{
      roleId: 1,
      name: 'ADMIN',
      description: 'Admin Rights'
    },
      {
        roleId: 2,
        name: 'USER_ADMIN',
        description: 'Manage User Accounts'
      },
      {
        roleId: 3,
        name: 'REQUESTER',
        description: 'Request Schedules'
      },
      {
        roleId: 4,
        name: 'APPROVER',
        description: 'Approve Schedules'
      }];
    return roles;
  }
}
