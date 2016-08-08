var app = angular.module('yahtzeeApp', ['ngRoute']);

app.controller('yahtzeeCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
  var ref = new Firebase('https://billandaaronsyahtzee.firebaseio.com/');
}]);
