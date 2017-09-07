//Menus
angular.module('hoursanddowntime')
  .run(menuConfig);

menuConfig.$inject = ['menuService'];

function menuConfig(menuService) {
  menuService.addMenuItem('topbar', {
    title: 'Hours vs Downtime',
    state: 'hoursanddowntime',
    class: 'assignment',
    description: 'Compare hours and downtime of equipment',
    roles: ['REQUESTER', 'APPROVER']
  });
}
