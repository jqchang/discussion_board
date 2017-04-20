app.factory('userFactory', function($http) {
  var factory = {};
  var activeUser = {};
  
  factory.getActiveUser = function(callback) {
    callback(activeUser);
  }

  factory.logout = function(callback) {
    activeUser = {};
    callback(activeUser);
  }

  factory.showUser = function(callback, id) {
    $http.get('/users/'+id,{}).then(function(response){
      console.log(response);
      callback(response.data);
    }), function() {
      console.log("Error in /users/"+id);
    }
  }

  factory.deleteUser = function(callback, user) {
    var errors = [];
    // friends.splice(friends.indexOf(friend), 1);
    $http.delete('/users/'+user._id, {}).then(function(response) {
      $http.get('/users',{}).then(function(response){
        users = response.data;
        errors = response.data.errors;
        callback(errors, users);
      });
    }, function() {
      console.log("Error in userFactory.deleteUser!");
    });
  }

  factory.login = function(callback, login) {
    console.log("login()",login);
    var errors = [];
    if(!login) {
      errors.push("Please enter a name!");
    }
    if(!errors.length) {
      $http.post('/users',{name: login.name}).then(function(response){
        if(response.data.login) {
          activeUser = response.data.user;
        }
        callback(response.data);
      }), function() {
        console.log("Error in userFactory.createUser")
      }
    }
    else {
      callback({errors:errors});
    }
  }
  return factory;
});
