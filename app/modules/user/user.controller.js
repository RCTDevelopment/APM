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
      var user = {
        username : vm.user.username,
        password : vm.newPassword
      }
      UserService.update(user).then(function success(response) {
        DialogService.showAlert(ev, 'Success', 'User updated successfuly.', 'Got it!');
        Authentication.getUserInfo(vm.currentUser.username).then(function success(response) {
          delete $sessionStorage.globals;
          var user_roles = [];
          user_roles.push(response.data.role)
          Authentication.setCredentials(response.data.username, user_roles, response.data)
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
}
