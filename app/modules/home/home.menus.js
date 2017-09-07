//Menus
angular.module('home')
  .run(menuConfig);

menuConfig.$inject = ['menuService'];

function menuConfig(menuService) {
  menuService.addMenuItem('topbar', {
    title: 'Dashboard',
    state: 'home',
    class: 'dashboard',
    roles: '*'
  });
}
