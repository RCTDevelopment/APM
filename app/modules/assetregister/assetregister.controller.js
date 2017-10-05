'use strict';

//Register a new controller for your module openvpn
angular.module('assetregister').controller('assetregisterController', assetregisterController);

//Inject dependencies
assetregisterController.$inject = ['$state', 'principal','$scope','DialogService','$mdDialog', '$timeout', '$q','assetregisterService'];

function assetregisterController($state, principal,$scope,DialogService,$mdDialog, $timeout, $q,assetregisterService) {
  //define a scope variable to bind to the DOM
  var vm = this;

  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];

  $scope.options = {
    rowSelection: true,
    multiSelect: false,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: true,
    limitSelect: true,
    pageSelect: true
  };

  $scope.query = {
    order: 'plantno',
    limit: 5,
    page: 1
  };

  assetregisterService.getAssets().then(function(response) {
    $scope.assetTable = {
      'count': 0,
      'data' : []
    };

    for(var i=1; i < Object.keys(response.data).length+1; i++){
      $scope.assetTable.data.push(response.data[i]);
      $scope.assetTable.count++;
    }

  })

  $scope.addAsset = function(ev) {
    $mdDialog.show({
      controller: vm.addAssetController,
      templateUrl: '/angular/app/modules/assetregister/addasset.template.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false
    }).then(function(asset) {
      assetregisterService.addAsset(asset).then(function success(response) {
        $scope.loadStuff();
      }, function error(response) {
        DialogService.showSimpleToast('Could not add new asset.');
      })
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };


  $scope.loadStuff = function() {
    $scope.promise = $timeout(function() {
      assetregisterService.getAssets().then(function(response) {
        $scope.assetTable = {
          'count': 0,
          'data' : []
        };

        for(var i=1; i < Object.keys(response.data).length+1; i++){
          $scope.assetTable.data.push(response.data[i]);
          $scope.assetTable.count++;
        }
      },function failure(response) {
        if (response.status === 401) {
          Authentication.clearCredentials();
          $state.go('login');
        }
      })
    }, 2000);
  }

  vm.addAssetController = function($scope, $mdDialog, UserService) {

    $scope.asset = {};
    $scope.asset.repairs = 'None';

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };


    $scope.answer = function(answer) {
      $mdDialog.hide($scope.asset);
    };
  }

  $scope.delete = function(ev) {
    var confirm = $mdDialog.confirm()
      .title('Delete')
      .textContent('Are you sure you want to delete this asset ?')
      .ariaLabel('Delete Asset')
      .targetEvent(ev)
      .ok('Delete')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      assetregisterService.deleteAsset($scope.selected[0]).then(function success(response) {
        $scope.selected = [];
        $scope.loadStuff();
      }, function failure(response) {
        DialogService.showAlert(ev, 'Delete', 'Could not delete ' + $scope.selected[0].plantno, 'Ok');
      });
    });
  }

  $scope.update = function(ev) {
    assetregisterService.updateAsset($scope.selected[0]).then(function success(response) {
      DialogService.showAlert(ev, 'Update', $scope.selected[0].plantno + ' was updated successfuly.', 'Got it!');
      $scope.selected = [];
    }, function failure(response) {
      console.log(response)
    })
  }

}
