var app = angular.module( 'yahtzeeApp', [ 'ngRoute' ] );
app.config( function( $routeProvider, $httpProvider ) {
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
} )
app.controller( 'yahtzeeCtrl', [ '$scope', '$firebaseArray', function( $scope, $firebaseArray ) {
	var ref = new Firebase( 'https://billandaaronsyahtzee.firebaseio.com/' );
} ] );

app.controller( 'IndexController', [ '$scope', '$firebaseArray', function( $scope, $firebaseArray ) {
	var ref = new Firebase( 'https://billandaaronsyahtzee.firebaseio.com/' );
} ] );
