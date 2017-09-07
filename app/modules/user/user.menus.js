//Menus
angular.module('user')
  .run(menuConfig);

menuConfig.$inject = ['menuService'];

function menuConfig(menuService) {
  menuService.addMenuItem('topbar', {
    title: 'User',
    state: 'user',
    class: 'account_circle',
    description: 'Manage your own user profile.',
    roles: ['ADMIN', 'USER_ADMIN', 'APPROVER', 'REQUESTER']
  });
}
