var app = angular.module('yahtzeeApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('gameboard', {
      templateUrl: '../../views/gameboard.html',
      controller: 'yahtzeeCtrl'
    });
});

app.controller('yahtzeeCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
  var ref = new Firebase('https://billandaaronsyahtzee.firebaseio.com/');
}]);
