app.controller('quotesController', function($rootScope, $scope, $http, $timeout, $state, quotesService, localStorageService, authService){
  $scope.quotes = undefined;
  $scope.error = undefined;
  $scope.showAsList = quotesService.showAsList;

  /**
   * Return the employee information from LDAP
   * @method getData
   * @param  {String} localStorageService.USER label used to store the JSON object
   * @return {Object}                          JSON with user information
   */
  var userData = localStorageService.getData(localStorageService.USER);
  $scope.user = {
    "name" : userData.cn,
    "picture" : userData.photo,
    "role" : userData.role
  };

  /**
   * Used to return all quotes from user
   * @method listQuotes
   * @return {Array of Objects}   Contains all quotes from user;
   */
  quotesService.listQuotes().then(function(data){
    $scope.quotes = data;
  }, function(error) {
    $scope.error = error;
  });

  /**
   * Will change the method of the quote list is shown in the screen
   * @method changeListMethod
   * @param  {Boolean} isList True to show quotes as table | False to show quotes as cards
   */
  $scope.changeListMethod = function(isList) {
    $scope.showAsList = isList;
    quotesService.showAsList = $scope.showAsList;
  };

  /**
   * Will log user out of the application
   * @method logout
   */
  $scope.logout = function(){
    authService.logout();
    $state.go('login');
  };
});
