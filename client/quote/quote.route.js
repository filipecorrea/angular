angular.module('myApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('quote',{
    url: '/quote/:id',
    data: {
      'animateMenu': 'navigation--animated',
      'animateMain': 'view--animate-entry'
    },
    views: {
      'main': {
        templateUrl: 'quote/quote.view.html',
        controller: 'quoteController'
      },
      'navigation': {
        templateUrl: 'navigation/quote-navigation.view.html'
      }
    }
  })

  // QUOTE MAIN
  .state('quoteInfo',{
    url: '/quote/info',
    views: {
      'main': {
        templateUrl: 'quote/quote-info.view.html',
        controller: 'quoteController'
      },
      'navigation': {
        templateUrl: 'navigation/quote-navigation.view.html'
      }
    }
  })

  //NEW QUOTE
  .state('quoteNew',{
    url: '/quote/new',
    views: {
      'main': {
        templateUrl: 'quote/new/quote.new.html',
        controller: 'newQuoteController'
      },
      'navigation': {
        templateUrl: 'navigation/quote-navigation.view.html'
      }
    }
  });
});
