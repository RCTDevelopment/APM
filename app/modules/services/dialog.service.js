
angular.module('andruclient').service('DialogService', dialogservice);

dialogservice.$inject = ['$mdDialog', '$mdToast'];

function dialogservice($mdDialog, $mdToast) {

  this.showAlert = function(ev, title, textContent, ok) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(title)
        .textContent(textContent)
        .ariaLabel('Alert')
        .ok(ok)
        .targetEvent(ev)
    );
  };

  this.showSimpleToast = function(text) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(text)
        .position('bottom right')
        .hideDelay(3000)
    );
  }
}
