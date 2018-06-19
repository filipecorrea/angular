 angular.module('myApp')
.config(function ($httpProvider) {
  /** Used to preprocess every HTTP request to check if the user
  is loggedin and add the token to the request */
  $httpProvider.interceptors.push('authInterceptorFactory');
})
.run(function($rootScope, $state, $window, $location, authService){
  $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl, newState, oldState){
      if(newUrl.indexOf('login') === -1 && !authService.isAuthenticated()) {
          event.preventDefault();
          $location.url('/login');
      }
  });
});
