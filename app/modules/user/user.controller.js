'use strict';

//Register a new user controller for your module user
angular.module('user').controller('UserController', UserController);

//Inject dependencies
UserController.$inject = ['$state', 'Authentication', '$sessionStorage', 'UserService', 'DialogService'];

function UserController($state, Authentication, $sessionStorage, UserService, DialogService) {
  var vm = this;
  vm.auth = Authentication;
  vm.user = $sessionStorage.globals.userObject;
  vm.currentUser = $sessionStorage.globals.currentUser;
  vm.allRoles = UserService.getAllRoles();
  vm.newPassword = null;
  vm.confirmNewPassword = null;

  vm.update = function(ev) {
    if (vm.newPassword === vm.confirmNewPassword) {
      if (vm.newPassword != null && vm.confirmNewPassword != null) {
        vm.user.unencryptedPassword = vm.confirmNewPassword;
        vm.newPassword = null;
        vm.confirmNewPassword = null;
      }
      UserService.update(vm.user).then(function success(response) {
        DialogService.showAlert(ev, 'Success', 'User updated successfuly.', 'Got it!');
        Authentication.getUserInfo(vm.currentUser.username).then(function success(response) {
          delete $sessionStorage.globals;
          var user_roles = [];
          response.data[0].roles.forEach(function(role) {
            user_roles.push(role.name)
          })
          Authentication.setCredentials(response.data[0].username, user_roles, response.data[0])
        })
      }, function failure(response) {
        if (response.status === 401) {
          Authentication.clearCredentials();
          $state.go('login');
        } else {
          DialogService.showAlert(ev, 'Error', 'Could not update user', 'Try again');
        }
      })
    } else {
      DialogService.showAlert(ev, 'Password', 'Passwords did not match.', 'Re enter');
      vm.newPassword = null;
      vm.confirmNewPassword = null;
    }
  }

  vm.toggle = function(item, list) {
    var found = false;
    var idx;
    for (var i = 0; i < list.length; i++) {
      if (list[i].roleId === item.roleId) {
        found = true;
        idx = i;
        break;
      }
    }
    if (found) {
      list.splice(idx, 1);
    } else {
      list.push(item);
    }
  };

  vm.exists = function(item, list) {
    var found = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i].roleId === item.roleId) {
        found = true;
        break;
      }
    }
    return found;
  };
}
