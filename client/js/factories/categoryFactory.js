app.factory('categoryFactory', function($http) {
  var factory = {};
  var categories = [];

  factory.getCategories = function(callback) {
    $http.get('/categories',{}).then(function(response){
      categories = response.data;
      callback(categories);
    }, function() {
      console.log("Error: could not load /categories");
    });
  }
  return factory;
});
