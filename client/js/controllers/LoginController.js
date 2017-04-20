app.controller('LoginController', ['$scope', '$routeParams', '$location', 'userFactory', function($scope, $routeParams, $location, userFactory) {
  $scope.user = {};
  $scope.errors = [];

  $scope.login = function(user) {
    userFactory.login(function(data){
      if(!data.errors) {
        $scope.user = data;
        $location.url('/dashboard');
      }
      else {
        $scope.errors = [`Login Failed`]
      }
    }, user);
  }
}]);
