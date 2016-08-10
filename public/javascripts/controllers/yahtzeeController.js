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
app.controller( 'yahtzeeCtrl', [ '$scope', '$firebaseArray', '$firebaseObject', function( $scope, $firebaseArray, $firebaseObject ) {
	var ref = firebase.database().ref().child("player1");
	$firebaseObject(ref).$bindTo($scope, "view.player1");
	var ref2 = firebase.database().ref().child("player2");
	$firebaseObject(ref2).$bindTo($scope, "view.player2");
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
	$scope.view.checkNumber = function(num, score, player){
		var count = 0;
		for (var i = 0; i < 5; i++) {
			if (tossResult[i] === num) {
				count++;
			}
		}
		$scope.view[player][score] = count * num;
		$scope.view[player].uppersubtotal+=count*num;
	};
	$scope.view.checkK3 = function(player){
		var resultSorted = tossResult.sort();
		if ((resultSorted[0] === resultSorted[1] && resultSorted[1] === resultSorted[2]) || (resultSorted[1] === resultSorted[2] && resultSorted[2] === resultSorted[3]) || (resultSorted[2] === resultSorted[3] && resultSorted[3] === resultSorted[4])) {
			$scope.view[player].K3 = tossResult[0] + tossResult[1] + tossResult[2] + tossResult[3] + tossResult[4];
		} else {
			$scope.view[player].K3 = 0;
		}
	};
	$scope.view.checkK4 = function(player){
		var resultSorted = tossResult.sort();
		if ((resultSorted[0] === resultSorted[1] && resultSorted[0] === resultSorted[2] && resultSorted[0] === resultSorted[3]) || (resultSorted[1] === resultSorted[2] && resultSorted[1] === resultSorted[3] && resultSorted[1] === resultSorted[4])) {
			$scope.view[player].K4 = tossResult[0] + tossResult[1] + tossResult[2] + tossResult[3] + tossResult[4];
		} else {
			$scope.view[player].K4 = 0;
		}
	};
	$scope.view.checkFH = function(player){
		var resultSorted = tossResult.sort();
		if ((resultSorted[0] === resultSorted[1] && resultSorted[2] === resultSorted[3] && resultSorted[2] === resultSorted[4]) || (resultSorted[0] === resultSorted[1] && resultSorted[0] === resultSorted[2] && resultSorted[3] === resultSorted[4])) {
			$scope.view[player].FH = 25;
		} else {
			$scope.view[player].FH = 0;
		}
	};
	$scope.view.checkSmS = function(player){
		var resultSorted = tossResult.sort();
		if (/1234|2345|3456/.test( resultSorted.join("").replace(/(.)\1/,"$1") )) {
			$scope.view[player].SmS = 30;
		} else {
			$scope.view[player].SmS = 0;
		}
	};
	$scope.view.checkLgS = function(player){
		var resultSorted = tossResult.sort();
		if (/12345|23456/.test( resultSorted.join(""))) {
			$scope.view[player].LgS = 40;
		} else {
			$scope.view[player].LgS = 0;
		}
	};
	$scope.view.checkyahtzee = function(player){
		if (tossResult[0] === tossResult[1] && tossResult[0] === tossResult[2] && tossResult[0] === tossResult[3] && tossResult[0] === tossResult[4]) {
			$scope.view[player].yahtzee = 50;
		}
		else {
			$scope.view[player].yahtzee = 0;
		}
	};
	$scope.view.checkchance = function(player){
		$scope.view[player].chance = tossResult[0]+tossResult[1]+tossResult[2]+tossResult[3]+tossResult[4];
	};
} ] );

app.controller( 'IndexController', [ '$scope', '$firebaseArray', function( $scope, $firebaseArray ) {} ] );
