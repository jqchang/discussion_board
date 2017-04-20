app.factory('topicFactory', function($http) {
  var factory = {};
  var topics = [];

  factory.getTopics = function(callback) {
    $http.get('/topics',{}).then(function(response){
      topics = response.data;
      callback(topics);
    }, function() {
      console.log("Error: could not load /topics");
    });
  }

  factory.showTopic = function(callback, id) {
    $http.get('/topics/'+id,{}).then(function(response){
      console.log(response);
      callback(response.data);
    }), function() {
      console.log("Error in /users/"+id);
    }
  }

  factory.newTopic = function(callback, topic, user) {
      var errors =[];
      if(topic) {
        if(!topic.name) { errors.push("Name is required!"); }
        if(!topic.description) { errors.push("Description is required!"); }
        if(!topic.category) { errors.push("Category is required!"); }
      }
      else {
        errors.push("Please fill out all fields!");
      }
      if(!errors.length) {
        console.log("Attempting to POST");
        $http.post('/topics',topic).then(function(response){
          var id = response.data._id;
          user.topics.push(id);
          $http.put('/users/'+user._id, user).then(function(response) {
            callback(response);
          }, function(response) {
            console.log('put attempt failed', response);
          })
        }), function() {
          console.log("Error in friendFactory.newTopic")
        }
      }
      else {
        console.log(errors);
        callback(errors);
      }
    }

  return factory;
});
