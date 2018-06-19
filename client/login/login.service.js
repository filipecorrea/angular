angular.module('myApp')
.service('loginService',function($http, $q, localStorageService, authService){
  var self = this;
  /**
   * will submit the content of the login form
   * @method submit
   * @param  {object} credentials Contains all information about user login
   * @param  {String} credentials.username Stores the intranet ID of the username
   * @param  {String} credentials.password Stores the pass code used to login
   * @return {promisse}           Promisse that contains the result of the authentication
   */

  self.submit = function(credentials) {
    var deferred = $q.defer();

    $http.post('/api/authentication', credentials)
    .success(function(result) {
      localStorageService.setData(localStorageService.TOKEN, result.token);
      localStorageService.setData(localStorageService.USER, result);

      deferred.resolve(result.user);

    }).error(function(error) {
        if(authService.isAuthenticated()) {
            authService.logout();
        }
        deferred.reject(error);

    });

    return deferred.promise;
  };

  self.logout = function(){
    if(authService.isAuthenticated()) {
        authService.logout();
    }
  };

  return self;
});
