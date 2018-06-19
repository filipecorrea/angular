app.controller('quoteController', function($rootScope, $scope, $http, $timeout){
  $scope.quote = undefined;
  $scope.error = undefined;

  $http.get('/api/quotes.json').then(
    function(res){
      $timeout(function(){
        $scope.quote = res.data[0];
      }, 0);
    },
    function(res){
      $scope.error = {
        'status': res.status,
        'message': res.data
      };
    });

});
