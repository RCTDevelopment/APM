'use strict';

//Register a new controller for your module userManagement
angular.module('userManagement').controller('UserManagementController', UserManagementController);

//Inject dependencies
UserManagementController.$inject = ['$state', '$scope', 'Authentication', 'DialogService', '$mdDialog', '$timeout', '$q', 'UserManagementService', '$sessionStorage', 'UserService'];

function UserManagementController($state, $scope, Authentication, DialogService, $mdDialog, $timeout, $q, UserManagementService, $sessionStorage, UserService) {
  //define a scope variable to bind to the DOM
  var vm = this;
  vm.currentUser = $sessionStorage.globals.currentUser;
  vm.userObject = $sessionStorage.globals.userObject;
  vm.allRoles = UserService.getAllRoles();
  vm.usersTable = [];

  UserManagementService.getAllUsers().then(function success(response) {
    vm.usersTable = {
      'count': response.data.length,
      'data': response.data
    };
  }, function failure(response) {
    if (response.status === 401) {
      Authentication.clearCredentials();
      $state.go('login');
    }
  })

  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];

  vm.options = {
    rowSelection: true,
    multiSelect: false,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: true,
    limitSelect: true,
    pageSelect: true
  };

  vm.query = {
    order: 'fullname',
    limit: 5,
    page: 1
  };

  vm.update = function(ev) {
    UserService.update($scope.selected[0]).then(function success(response) {
      DialogService.showAlert(ev, 'Update', $scope.selected[0].fullname + ' was updated successfuly.', 'Got it!');
      $scope.selected = [];
    }, function failure(response) {
      console.log(response)
    })
  }

  vm.delete = function(ev) {
    var confirm = $mdDialog.confirm()
      .title('Delete')
      .textContent('Are you sure you want to delete this user ?')
      .ariaLabel('Delete user')
      .targetEvent(ev)
      .ok('Delete')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      UserService.delete($scope.selected[0]).then(function success(response) {
        $scope.selected = [];
        $scope.loadStuff();
      }, function failure(response) {
        DialogService.showAlert(ev, 'Delete', 'Could not delete ' + $scope.selected[0].fullname, 'Ok');
      });
    });
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

  $scope.loadStuff = function() {
    $scope.promise = $timeout(function() {
      UserManagementService.getAllUsers().then(function success(response) {
        $scope.selected = [];
        DialogService.showSimpleToast('Users refreshed.');
        vm.usersTable = {
          'count': response.data.length,
          'data': response.data
        };
      }, function failure(response) {
        if (response.status === 401) {
          Authentication.clearCredentials();
          $state.go('login');
        }
      })
    }, 2000);
  }

  vm.toggleSuspend = function() {
    var action = null;
    if ($scope.selected[0].suspended === true) {
      action = 'suspend';
    } else if ($scope.selected[0].suspended === false) {
      action = 'activate';
    }
    UserService.manage($scope.selected[0], action).then(function success(response) {
      DialogService.showSimpleToast('User suspension status was changed.');
    }, function failure(response) {
      DialogService.showSimpleToast('User activation failed.');
      $scope.selected[0].suspended = false;
    });
  }

  vm.addNewUser = function(ev) {
    $mdDialog.show({
      controller: vm.addNewUserController,
      templateUrl: 'modules/user-management/add-user.template.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false
    }).then(function(user) {
      UserService.add(user).then(function success(response) {
        $scope.loadStuff();
      }, function error(response) {
        DialogService.showSimpleToast('Could not add new user.');
      })
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  vm.addNewUserController = function($scope, $mdDialog, UserService) {
    $scope.user = {
      roles: []
    };
    $scope.allRoles = UserService.getAllRoles();
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.toggle = function(item, list) {
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

    $scope.exists = function(item, list) {
      var found = false;
      for (var i = 0; i < list.length; i++) {
        if (list[i].roleId === item.roleId) {
          found = true;
          break;
        }
      }
      return found;
    };
    $scope.answer = function(answer) {
      $mdDialog.hide($scope.user);
    };
  }
}
