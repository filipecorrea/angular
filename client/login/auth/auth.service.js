
angular.module('myApp')
.factory('authService', function (jwtHelper, localStorageService) {
  var self = this;

  /**
   * Check if the user is authenticated
   * @method isAuthenticated
   * @return {boolean} True if is authenticated, False if not;
   */

  self.isAuthenticated = function() {
      var token = localStorageService.getData(localStorageService.TOKEN);
      if(token !== undefined && token !== null) {
        return !jwtHelper.isTokenExpired(token);
      } else {
        return false;
      }
  };

  /**
   * Will clear the login information from Cookie Storage
   * @method logout
   */

  self.logout = function() {
      localStorageService.clear();
  };

  return self;
});
