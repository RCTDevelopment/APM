'use strict';

angular
  .module('andruclient')
  .config(routeConfig);

//We need to configure dbpsite as the main route
routeConfig.$inject = ['$urlRouterProvider', '$mdThemingProvider', '$provide'];

function routeConfig($urlRouterProvider, $mdThemingProvider, $provide) {
  $urlRouterProvider.otherwise('/');
  $mdThemingProvider.theme('light')
    .primaryPalette('blue-grey', {
      'default': '400',
      'hue-1': '100',
      'hue-2': '500',
      'hue-3': '900'
    })
    .accentPalette('blue')
    .backgroundPalette('grey', {
      'default': '200'
    })
    .warnPalette('red');

  $mdThemingProvider.theme('dark')
    .primaryPalette('indigo', {
      'default': '500',
      'hue-1': '400',
      'hue-2': '700',
      'hue-3': '800'
    })
    .accentPalette('teal')
    .warnPalette('red')
    .dark();

  $mdThemingProvider.enableBrowserColor();
  $mdThemingProvider.setDefaultTheme('light');
  $mdThemingProvider.alwaysWatchTheme(true);
  $provide.value('mdTheming', $mdThemingProvider);

}

angular
  .module('andruclient')
  .run(menuConfig);

menuConfig.$inject = ['menuService'];

function menuConfig(menuService) {

}
