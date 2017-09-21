//Menus
angular.module('cubesperhour')
  .run(menuConfig);

menuConfig.$inject = ['menuService'];

function menuConfig(menuService) {
  menuService.addMenuItem('topbar', {
    title: 'Cubes per hour',
    state: 'cubesperhour',
    class: 'assignment',
    description: 'Calculate the total cubes devided by the total runtime',
    roles: ['ADMIN', 'MANAGER','DIRECTOR']
  });
}
