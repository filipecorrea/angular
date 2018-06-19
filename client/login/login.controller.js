angular.module('myApp')
.controller('loginController', function ($rootScope, $location, $scope, $timeout, loginService, localStorageService) {
  $scope.login = undefined;
  $scope.messages = "";
  $scope.credentials = {
      username: '',
      password: ''
  };

  /**
   * Submit the credencials to backend for validation
   * @method callSubmit
   */
  var callSubmit = function(){
      $scope.login = "loading";
      loginService.submit($scope.credentials)
      .then(function(data){
      //    getStateList();
          $location.path('/quotes');
      }, function(errorMsg){
          $scope.login = undefined;
          $timeout(function(){
              $scope.messages = errorMsg;
          });
      });
  };

  /**
   * Checks if required fields are filled before call submit
   * @method submitCredentials
   */
  $scope.submitCredentials = function() {
      if ($scope.credentials.username.trim() === '' || $scope.credentials.password.trim() === '') {

          $scope.credentials.username = $("#inputEmail").val();
          $scope.credentials.password = $("#inputPassword").val();

          if ($scope.credentials.username.trim() === '' || $scope.credentials.password.trim() === '') {
               $timeout(function(){
                  $scope.messages = "Username or Password is empty. Please fill the fields";
              });
          }else{
              callSubmit();
          }
      }else{
          callSubmit();
      }
  };
/*
  var getStateList = function(){
      var user = cookieStoreSrvc.getData('user');
      QuoteSrvc.getState(user.countryCode).then(function(result){
          localStorageSrvc.setData(localStorageSrvc.STATES, result);
      }, function(errorMsg){
          localStorageSrvc.setData(localStorageSrvc.STATES, []);
      });
  };
  */
});
