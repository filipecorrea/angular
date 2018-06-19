angular.module('myApp')
.config(function ($stateProvider) {
  $stateProvider
    // QUOTE LIST
    .state('quotes',{
      url: '/quotes',
      data: {
        'animateMenu': 'navigation--animated',
        'animateMain': 'view--animate-entry'
      },
      views: {
        'main': {
          templateUrl: 'quotes/quotes.view.html',
          controller: 'quotesController'
        },
        'navigation': {
          templateUrl: 'navigation/quote-list-navigation.view.html',
          controller: 'quotesController'
        }
      }
    });

  });
