console.log("ReplyController");
app.controller('ReplyController', ['$scope', '$routeParams', '$location', 'topicFactory', 'postFactory', 'commentFactory', 'userFactory', function($scope, $routeParams, $location, topicFactory, postFactory, commentFactory, userFactory) {
  $scope.activeUser = {};
  $scope.topic = {};
  $scope.errors = [];
  $scope.newPost = {};
  $scope.newComment = {};
  $scope.pleaseLogin = false;

  userFactory.getActiveUser(function(data) {
    $scope.activeUser = data;
    if(!$scope.activeUser.name) {
      $scope.pleaseLogin = true;
    }
  });

  function refreshTopics() {
    topicFactory.showTopic(function(data){
      if(!data.errors) {
        $scope.topic = data;
        console.log($scope.topic);
      }
      else {
        $scope.errors = [`Could not retrieve topic id=${$routeParams.id}`]
      }
    }, $routeParams.id);
  }

  refreshTopics();

  $scope.logout = function() {
    userFactory.logout(function(data){
      $scope.pleaseLogin = true;
      $scope.activeUser = data;
      $location.url('/');
    });
  }

  $scope.createPost = function() {
    $scope.newPost._user = $scope.activeUser._id;
    console.log($scope.topic);
    postFactory.newPost(function(data) {
      console.log("Callback passed from post factory to controller", data)
      if(data.errors) {
        $scope.errors = data.errors;
      }
      else {
        console.log("no errors in post creation!");
      }
      refreshTopics();
    }, $scope.newPost, $scope.activeUser, $scope.topic);
    $scope.newPost = {};
  }

  $scope.createComment = function(post) {
    $scope.newComment[post._id]._user = $scope.activeUser._id;
    console.log("Controller attempting to send comment:", $scope.newComment[post._id]);
    commentFactory.newComment(function(data) {
      console.log("Callback passed from comment factory to controller", data)
      if(data.errors) {
        $scope.errors = data.errors;
      }
      else {
        console.log("no errors in post creation!");
      }
      refreshTopics();
    }, $scope.newComment[post._id], post, $scope.activeUser);
    $scope.newComment = {};
  }

  $scope.upvote = function(post) {
    console.log($scope.activeUser.name, "upvotes", post._id);
    console.log("current upvotes:",post.upvote);
    postFactory.upvote(post, $scope.activeUser._id, function(){
      refreshTopics();
    })
  }
  $scope.downvote = function(post) {
    console.log($scope.activeUser.name, "downvotes", post._id);
    console.log("current downvotes:",post.downvote);
    postFactory.downvote(post, $scope.activeUser._id, function(){
      refreshTopics();
    })
  }
}]);
