var app = angular.module( 'yahtzeeApp', [ 'ngRoute', 'firebase' ] );
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
		} );
} );
app.controller( 'yahtzeeCtrl', [ '$scope', '$firebaseArray', '$firebaseObject', function( $scope, $firebaseArray, $firebaseObject ) {
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

	var ref = firebase.database().ref().child("player1");
	$firebaseObject(ref).$bindTo($scope, "view.player1");
	$scope.playerCard = $firebaseObject(ref);
	$scope.view.addOnes = function(){
		$scope.view.$save({
			aces: $scope.view.player1.aces
		});
	};
} ] );

app.controller( 'IndexController', [ '$scope', '$firebaseArray', function( $scope, $firebaseArray ) {
} ] );
