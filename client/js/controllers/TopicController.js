console.log("TopicController");
app.controller('TopicController', ['$scope', '$routeParams', '$location', 'topicFactory', 'userFactory', 'categoryFactory', function($scope, $routeParams, $location, topicFactory, userFactory, categoryFactory) {
  $scope.user = {};
  $scope.newTopic = {};
  $scope.categories = [];
  $scope.pleaseLogin = false;
  $scope.newSearch = "";
  $scope.ordering = "-createdAt"

  userFactory.getActiveUser(function(data) {
    $scope.user = data;
    if(!$scope.user.name) {
      $scope.pleaseLogin = true;
    }
  });

  categoryFactory.getCategories(function(data){
    if(!data.errors) {
      $scope.categories = data;
    }
    else {
      $scope.errors = [`Could not retrieve category list`]
    }
  });

  topicFactory.getTopics(function(data){
    if(!data.errors) {
      $scope.topics = data;
    }
    else {
      $scope.errors = [`Could not retrieve topic list`]
    }
  });

  $scope.logout = function() {
    userFactory.logout(function(data){
      $scope.pleaseLogin = true;
      $scope.user = data;
      $location.url('/');
    });
  }

  $scope.order = function(str) {
    if($scope.ordering != str) {
      $scope.ordering = str;
    }
    else {
      $scope.ordering = '-' + str;
    }
  }

  $scope.makeTopic = function() {
    $scope.newTopic.creator = $scope.user._id;
    $scope.newTopic.category = $scope.newTopic.category._id;
    topicFactory.newTopic(function(data) {
      $scope.newTopic = {};
      topicFactory.getTopics(function(data) {
        $scope.topics = data;
      })
    }, $scope.newTopic, $scope.user)
  }
}]);
