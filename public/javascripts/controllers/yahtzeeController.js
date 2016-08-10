var app = angular.module( 'yahtzeeApp', [ 'ngRoute', 'firebase' ] );
app.config( function( $routeProvider, $httpProvider, $locationProvider ) {
	$routeProvider
		.when( '/', {
			templateUrl: '/views/home.html',
			controller: 'IndexController',
			controllerAs: 'index'
		} )
		.when( '/game', {
			templateUrl: '/views/gameboard.html',
			controller: 'yahtzeeCtrl',
			controllerAs: 'yahtzee'
		} )
		.when( '/signup', {
			templateUrl: '/views/signup.html',
			controller: ''
		} );
	$locationProvider.html5Mode( {
		enabled: true,
		requireBase: false
	} );
} );
app.controller( 'signupCtrl', [ '$scope', '$firebaseAuth', function( $scope, $firebaseAuth ) {

<<<<<<< HEAD
app.config(function($routeProvider){
  $routeProvider
  .when('signin', {
    templateUrl: '../../signin',
    controller: 'yahtzeeCtrl'
  });
});

app.controller('yahtzeeCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
  var ref = new Firebase('https://billandaaronsyahtzee.firebaseio.com/');
}]);
=======

} ] );
app.controller( 'yahtzeeCtrl', [ '$scope', '$firebaseArray', '$firebaseObject', function( $scope, $firebaseArray, $firebaseObject ) {
	var ref = firebase.database().ref().child( "player1" );
	$firebaseObject( ref ).$bindTo( $scope, "view.player1" );
	var ref2 = firebase.database().ref().child( "player2" );
	$firebaseObject( ref2 ).$bindTo( $scope, "view.player2" );
	$scope.view = {};
	$scope.view.player1 = {};
	$scope.view.player2 = {};
	$scope.view.player1.aces = 0;
	$scope.view.player1.twos = 0;
	$scope.view.player1.threes = 0;
	$scope.view.player1.fours = 0;
	$scope.view.player1.fives = 0;
	$scope.view.player1.sixes = 0;
	$scope.view.player1.uppersubtotal = $scope.view.player1.aces + $scope.view.player1.twos + $scope.view.player1.threes + $scope.view.player1.fours + $scope.view.player1.fives + $scope.view.player1.sixes;
	$scope.view.player1.uppertotal = 0;
	$scope.view.player1.K3 = 0;
	$scope.view.player1.K4 = 0;
	$scope.view.player1.FH = 0;
	$scope.view.player1.SmS = 0;
	$scope.view.player1.LgS = 0;
	$scope.view.player1.yahtzee = 0;
	$scope.view.player1.chance = 0;
	$scope.view.player1.yahtzeebonus = 0;
	$scope.view.player1.lowertotal = $scope.view.player1.K3 + $scope.view.player1.K4 + $scope.view.player1.FH + $scope.view.player1.SmS + $scope.view.player1.LgS + $scope.view.player1.yahtzee + $scope.view.player1.chance + $scope.view.player1.yahtzeebonus;
	$scope.view.player1.grandtotal = $scope.view.player1.uppertotal + $scope.view.player1.lowertotal;
	$scope.view.player2.aces = 0;
	$scope.view.player2.twos = 0;
	$scope.view.player2.threes = 0;
	$scope.view.player2.fours = 0;
	$scope.view.player2.fives = 0;
	$scope.view.player2.sixes = 0;
	$scope.view.player2.uppersubtotal = $scope.view.player2.aces + $scope.view.player2.twos + $scope.view.player2.threes + $scope.view.player2.fours + $scope.view.player2.fives + $scope.view.player2.sixes;
	$scope.view.player2.uppertotal = 0;
	$scope.view.player2.K3 = 0;
	$scope.view.player2.K4 = 0;
	$scope.view.player2.FH = 0;
	$scope.view.player2.SmS = 0;
	$scope.view.player2.LgS = 0;
	$scope.view.player2.yahtzee = 0;
	$scope.view.player2.chance = 0;
	$scope.view.player2.yahtzeebonus = 0;
	$scope.view.player2.lowertotal = $scope.view.player2.K3 + $scope.view.player2.K4 + $scope.view.player2.FH + $scope.view.player2.SmS + $scope.view.player2.LgS + $scope.view.player2.yahtzee + $scope.view.player2.chance + $scope.view.player2.yahtzeebonus;
	$scope.view.player2.grandtotal = $scope.view.player2.uppertotal + $scope.view.player2.lowertotal;
	$scope.view.checkNumber = function( num, score, player ) {
		var count = 0;
		for ( var i = 0; i < 5; i++ ) {
			if ( tossResult[ i ] === num ) {
				count++;
			}
		}
		$scope.view[ player ][ score ] = count * num;
		$scope.view[ player ].uppersubtotal += count * num;
	};

} ] );

app.controller( 'IndexController', [ '$scope', '$firebaseArray', function( $scope, $firebaseArray ) {} ] );
>>>>>>> 0b7b7eda3c5d76a919773d98e7d8b6c980ba94ba
