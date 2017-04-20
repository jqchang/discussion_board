var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'LoginController',
  })
  .when('/dashboard', {
    templateUrl: 'partials/dashboard.html',
    controller: 'TopicController',
  })
  .when('/user/:id', {
    templateUrl: 'partials/user.html',
    controller: 'UserController',
  })
  .when('/topic/:id', {
    templateUrl: 'partials/showtopic.html',
    controller: 'ReplyController',
  })
  // .when('/products', {
  //   templateUrl: 'partials/products.html',
  //   controller: 'ProductController',
  // })
  // .when('/orders', {
  //   templateUrl: 'partials/orders.html',
  //   controller: 'OrderController',
  // })
  // .when('/settings', {
  //   templateUrl: 'partials/settings.html',
  //   // controller: 'CustomerController',
  // })
  .otherwise({
    redirectTo: '/'
  })
});
