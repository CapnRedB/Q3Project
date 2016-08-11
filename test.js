var assert = require( 'assert' );
var expect = require( 'chai' ).expect;
$scope = {};
$scope.view = {};
$scope.view.tossResult = [];
$scope.view.player1 = {};
$scope.view.player1.K3 = 0;
$scope.view.viewResult = "";
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
$scope.roll = function() {
	var result = "";
	for ( var i = 0; i < 5; i++ ) {
		var num = Math.ceil( Math.random() * 6 );
		result += "" + num;
	}
	$scope.view.viewResult = result;
}
$scope.updateP1UpperSubScore = function() {
	console.log( "fuck" );
	$scope.view.player1.uppersubtotal = $scope.view.player1.aces + $scope.view.player1.twos + $scope.view.player1.threes + $scope.view.player1.fours + $scope.view.player1.fives + $scope.view.player1.sixes;
}
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

$scope.view.checkK3 = function( player ) {
	var resultSorted = $scope.view.tossResult.sort();
	if ( ( resultSorted[ 0 ] === resultSorted[ 1 ] && resultSorted[ 1 ] === resultSorted[ 2 ] ) || ( resultSorted[ 1 ] === resultSorted[ 2 ] && resultSorted[ 2 ] === resultSorted[ 3 ] ) || ( resultSorted[ 2 ] === resultSorted[ 3 ] && resultSorted[ 3 ] === resultSorted[ 4 ] ) ) {
		$scope.view[ player ].K3 = resultSorted[ 0 ] + resultSorted[ 1 ] + resultSorted[ 2 ] + resultSorted[ 3 ] + resultSorted[ 4 ];
	} else {
		$scope.view[ player ].K3 = 0;
	}
};
$scope.view.checkK4 = function( player ) {
	var resultSorted = $scope.view.tossResult.sort();
	if ( ( resultSorted[ 0 ] === resultSorted[ 1 ] && resultSorted[ 0 ] === resultSorted[ 2 ] && resultSorted[ 0 ] === resultSorted[ 3 ] ) || ( resultSorted[ 1 ] === resultSorted[ 2 ] && resultSorted[ 1 ] === resultSorted[ 3 ] && resultSorted[ 1 ] === resultSorted[ 4 ] ) ) {
		$scope.view[ player ].K4 = $scope.view.tossResult[ 0 ] + $scope.view.tossResult[ 1 ] + $scope.view.tossResult[ 2 ] + $scope.view.tossResult[ 3 ] + $scope.view.tossResult[ 4 ];
	} else {
		$scope.view[ player ].K4 = 0;
	}
};
$scope.view.checkFH = function( player ) {
	var resultSorted = $scope.view.tossResult.sort();
	if ( ( resultSorted[ 0 ] === resultSorted[ 1 ] && resultSorted[ 2 ] === resultSorted[ 3 ] && resultSorted[ 2 ] === resultSorted[ 4 ] ) || ( resultSorted[ 0 ] === resultSorted[ 1 ] && resultSorted[ 0 ] === resultSorted[ 2 ] && resultSorted[ 3 ] === resultSorted[ 4 ] ) ) {
		$scope.view[ player ].FH = 25;
	} else {
		$scope.view[ player ].FH = 0;
	}
};
$scope.view.checkSmS = function( player ) {
	var resultSorted = $scope.view.tossResult.sort();
	if ( /1234|2345|3456/.test( resultSorted.join( "" ).replace( /(.)\1/, "$1" ) ) ) {
		$scope.view[ player ].SmS = 30;
	} else {
		$scope.view[ player ].SmS = 0;
	}
};
$scope.view.checkLgS = function( player ) {
	var resultSorted = $scope.view.tossResult.sort();
	if ( /12345|23456/.test( resultSorted.join( "" ) ) ) {
		$scope.view[ player ].LgS = 40;
	} else {
		$scope.view[ player ].LgS = 0;
	}
};
$scope.view.checkYahtzee = function( player ) {
	if ( $scope.view.tossResult[ 0 ] === $scope.view.tossResult[ 1 ] && $scope.view.tossResult[ 0 ] === $scope.view.tossResult[ 2 ] && $scope.view.tossResult[ 0 ] === $scope.view.tossResult[ 3 ] && $scope.view.tossResult[ 0 ] === $scope.view.tossResult[ 4 ] ) {
		$scope.view[ player ].yahtzee = 50;
	} else {
		$scope.view[ player ].yahtzee = 0;
	}
};
$scope.view.checkBonus = function( player ) {
	if ( ( $scope.view.tossResult[ 0 ] === $scope.view.tossResult[ 1 ] && $scope.view.tossResult[ 0 ] === $scope.view.tossResult[ 2 ] && $scope.view.tossResult[ 0 ] === $scope.view.tossResult[ 3 ] && $scope.view.tossResult[ 0 ] === $scope.view.tossResult[ 4 ] ) && ( $scope.view[ player ].yahtzee === 50 ) ) {
		$scope.view[ player ].bonus += 100;
	} else {
		alert( 'You do not have any yahtzees yet! Putting 50 in yahtzee score' );
		$scope.view[ player ].yahtzee = 50;
	}
};
$scope.view.checkChance = function( player ) {
	$scope.view[ player ].chance = $scope.view.tossResult[ 0 ] + $scope.view.tossResult[ 1 ] + $scope.view.tossResult[ 2 ] + $scope.view.tossResult[ 3 ] + $scope.view.tossResult[ 4 ];
};
afterEach( function() {
	$scope.view.tossResult = [];
} )
describe( 'Testing checkK3', function() {
	it( 'Should return 20', function() {
		$scope.view.tossResult = [ 6, 6, 6, 1, 2 ];
		$scope.view.checkK3( "player1" )
		expect( $scope.view.player1.K3 ).to.equal( 21 );
	} )
	it( 'should return 21', function() {
		$scope.view.tossResult = [ 6, 1, 6, 6, 1 ];
		$scope.view.checkK3( "player2" )
		expect( $scope.view.player2.K3 ).to.equal( 20 );
	} )
	it( 'Should return 0 because you do not have enough of 1 kind', function() {
		$scope.view.tossResult = [ 1, 2, 3, 4, 5 ];
		$scope.view.checkK3( "player1" )
		expect( $scope.view.player1.K3 ).to.equal( 0 );
	} )
} )
describe( 'Testing checkK4', function() {
	it( 'should return 25', function() {
		$scope.view.tossResult = [ 6, 6, 6, 6, 1 ];
		$scope.view.checkK4( "player1" );
		expect( $scope.view.player1.K4 ).to.equal( 25 );
	} )
	it( 'should return 5 because 4 of a kind + 1 is still 4 of a kind.', function() {
		$scope.view.tossResult = [ 1, 1, 1, 1, 1 ];
		$scope.view.checkK4( "player1" );
		expect( $scope.view.player1.K4 ).to.equal( 5 );
	} )
	it( 'should return 0 because we do not have 4 of a kind', function() {
		$scope.view.tossResult = [ 6, 6, 6, 1, 1 ];
		$scope.view.checkK4( "player2" );
		expect( $scope.view.player2.K4 ).to.equal( 0 );
	} )
} )
describe( 'Testing checkFH', function() {
	it( 'should return 25', function() {
		$scope.view.tossResult = [ 1, 1, 1, 3, 3 ];
		$scope.view.checkFH( "player1" );
		expect( $scope.view.player1.FH ).to.equal( 25 );
	} )
	it( 'should return 25 even if we mix up the order', function() {
		$scope.view.tossResult = [ 1, 3, 3, 1, 3 ];
		$scope.view.checkFH( "player2" );
		expect( $scope.view.player2.FH ).to.equal( 25 );
	} )
	it( 'should return 25 because 5 of a kind is still a Full House', function() {
		$scope.view.tossResult = [ 1, 1, 1, 1, 1 ];
		$scope.view.checkFH( "player1" );
		expect( $scope.view.player1.FH ).to.equal( 25 );
	} )
	it( 'should return 0 because 4 of a kind is not a Full House', function() {
		$scope.view.tossResult = [ 1, 1, 1, 1, 2 ]
		$scope.view.checkFH( 'player2' );
		expect( $scope.view.player2.FH ).to.equal( 0 );
	} )
} )
