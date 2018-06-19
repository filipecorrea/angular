angular.module('myApp')
.factory('authInterceptorFactory', function ($q, $injector, localStorageService, authService) {
  var self = this;

  /**
   * Add user token to the request when it is present, aka, user logged in
   * @method request
   * @param  {object} config Contains information about the authentication
   * @return {object}        Object filled with token information
   */
  self.request = function(config) {
      config.headers = config.headers || {};

      var token = localStorageService.getData(localStorageService.TOKEN);
      if(token) {
          config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
  };

  /**
   * Used to check authentication error, aka, token missing
   * @method responseError
   * @param  {Object} response Contains information about the authentication
   * @return {Promisse}        Return a rejected promisse
   */
  self.responseError = function(response) {
      if(response !== null) {
          if(!authService.isAuthenticated()) {
              localStorageService.clear();
              $injector.get('$state').go('login');
          } else {
//              ToastSrvc.showError('Error ' + response.status, response.data);
              $injector.get('$state').go('quotes');
          }
      }

      return $q.reject(response);
  };

  return self;
});
