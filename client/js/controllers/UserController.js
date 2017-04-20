app.controller('UserController', ['$scope', '$routeParams', '$location', 'userFactory', function($scope, $routeParams, $location, userFactory) {
  $scope.user = {};
  $scope.errors = [];


  userFactory.showUser(function(data){
      if(!data.errors) {
        $scope.user = data;
      }
      else {
        $scope.errors = [`Could not retrieve user id=${$routeParams.id}`]
      }
    }, $routeParams.id);

    $scope.logout = function() {
      userFactory.logout(function(data){
        $scope.pleaseLogin = true;
        $scope.user = data;
        $location.url('/');
      });
    }
}]);
