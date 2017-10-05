angular.module('assetregister').service('assetregisterService', assetregisterService);

function assetregisterService($http) {
  this.getAssets = function(){
    return $http.post('/angular/api/getAssets.php');
  }


  this.addAsset = function(asset){
    return $http.post('/angular/api/addAsset.php',asset);
  }

  this.deleteAsset = function(asset){
    return $http.post('/angular/api/deleteAsset.php',asset);
  }

  this.updateAsset = function(asset){
    return $http.post('/angular/api/updateAsset.php',asset);
  }
}
