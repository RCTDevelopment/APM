//Menus
angular.module('userManagement')
  .run(menuConfig);

menuConfig.$inject = ['menuService'];

function menuConfig(menuService) {
  menuService.addMenuItem('topbar', {
    title: 'User Management',
    state: 'userManagement',
    class: 'supervisor_account',
    description: 'Manage Users of the platform',
    roles: ['ADMIN']
  });
}
