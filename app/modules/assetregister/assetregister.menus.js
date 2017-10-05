//Menus
angular.module('assetregister')
  .run(menuConfig);

menuConfig.$inject = ['menuService'];

function menuConfig(menuService) {
  menuService.addMenuItem('topbar', {
    title: 'Asset Register',
    state: 'assetregister',
    class: 'build',
    description: 'Manage assets',
    roles: ['ADMIN']
  });
}
