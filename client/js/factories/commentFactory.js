app.factory('commentFactory', function($http) {
  var factory = {};
  var comments = [];

  factory.getComments = function(callback) {
    $http.get('/comments',{}).then(function(response){
      comments = response.data;
      callback(comments);
    }, function() {
      console.log("Error: could not load /comments");
    });
  }

  factory.newComment = function(callback, comment, post, user) {
      var errors =[];
      if(comment) {
        if(!comment._user) { errors.push("You must be logged in to post!"); }
        if(!comment.contents) { errors.push("Content is required!"); }
      }
      else {
        errors.push("Please fill out all fields!");
      }
      if(!errors.length) {
        $http.post('/comments',comment).then(function(response){
          var id = response.data._id;
          user.comments.push(id);
          $http.put('/users/'+user._id, user).then(function(response) {
            post.comments.push(id);
            console.log("updated post:",post)
            $http.put('/posts/'+post._id, post).then(function(response) {
              console.log('comment put', post);
              callback(response);
            }, function(response) {
              console.log('comment put attempt failed', response);
            })
            callback(response);
          }, function(response) {
            console.log('user put attempt failed', response);
          })

        }), function() {
          console.log("Error in postFactory.newPosts")
        }
      }
      else {
        console.log(errors);
        callback({errors:errors});
      }
    }

  return factory;
});
