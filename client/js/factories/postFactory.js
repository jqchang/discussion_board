app.factory('postFactory', function($http) {
  var factory = {};
  var posts = [];

  factory.getPosts = function(callback) {
    $http.get('/posts',{}).then(function(response){
      posts = response.data;
      callback(posts);
    }, function() {
      console.log("Error: could not load /posts");
    });
  }

  factory.newPost = function(callback, post, user, topic) {
    var errors =[];
    if(post) {
      if(!post._user) { errors.push("You must be logged in to post!"); }
      if(!post.contents) { errors.push("Content is required!"); }
    }
    else {
      errors.push("Please fill out all fields!");
    }
    if(!errors.length) {
      $http.post('/posts',post).then(function(response){
        var id = response.data._id;
        user.posts.push(id);
        $http.put('/users/'+user._id, user).then(function(response) {
          topic.posts.push(id);
          console.log("updated topic:",topic)
          $http.put('/topics/'+topic._id, topic).then(function(response) {
            console.log('topic put', topic);
            callback(response);
          }, function(response) {
            console.log('topic put attempt failed', response);
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

  factory.upvote = function(post, userID, callback) {
    if(post.downvote.indexOf(userID) == -1 && post.upvote.indexOf(userID) == -1) {
      post.upvote.push(userID);
    }
    else if(post.upvote.indexOf(userID) != -1) {
      post.upvote.splice(post.upvote.indexOf(userID), 1);
    }
    else if(post.downvote.indexOf(userID) != -1) {
      post.downvote.splice(post.downvote.indexOf(userID), 1);
      post.upvote.push(userID);
    }
    $http.put('/posts/'+post._id, post).then(function(response) {
      console.log(response);
    })
  }
  factory.downvote = function(post, userID, callback) {
    if(post.downvote.indexOf(userID) == -1 && post.upvote.indexOf(userID) == -1) {
      post.downvote.push(userID);
    }
    else if(post.downvote.indexOf(userID) != -1) {
      post.downvote.splice(post.downvote.indexOf(userID), 1);
    }
    else if(post.upvote.indexOf(userID) != -1) {
      post.upvote.splice(post.upvote.indexOf(userID), 1);
      post.downvote.push(userID);
    }
    $http.put('/posts/'+post._id, post).then(function(response) {
      console.log(response);
    })
  }

  return factory;
});
