angular.module('myApp')
.config(function ($stateProvider) {
  $stateProvider
    .state('login',{
      url: '/login',
      data: {'animateMain': 'view--animate-entry'},
      views: {
        'main': {
          templateUrl: 'login/login.html',
          controller: 'loginController'
        }
      }
    })

    .state('logout', {
        url: '/logout',
        controller: function(authService, $location) {
            authService.logout();
            $location.path('/login');
        }
    });
});
