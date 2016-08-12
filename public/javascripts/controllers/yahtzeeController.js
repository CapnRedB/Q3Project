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
			controllerAs: 'yahtzee',
			resolve: {
				// controller will not be loaded until $requireSignIn resolves
				// Auth refers to our $firebaseAuth wrapper in the factory below
				"currentAuth": [ "Auth", function( Auth ) {
					// $requireSignIn returns a promise so the resolve waits for it to complete
					// If the promise is rejected, it will throw a $stateChangeError (see above)
					return Auth.$requireSignIn();
      } ]
			}
		} )
		.when( '/signup', {
			templateUrl: '/views/signup.html',
			controller: 'signUpCtrl'
		} );
	$locationProvider.html5Mode( {
		enabled: true,
		requireBase: false
	} );
} );

app.factory( "Auth", [ "$firebaseAuth",
  function( $firebaseAuth ) {
		return $firebaseAuth();
  }
] );

app.controller( "signUpCtrl", [ "$scope", "Auth",
  function( $scope, Auth ) {
		$scope.toggleSignIn = function() {
			console.log( "SIGN IT" );
			if ( firebase.auth().currentUser ) {
				// [START signout]
				firebase.auth().signOut();
				// [END signout]
			} else {
				var email = document.getElementById( 'email' ).value;
				var password = document.getElementById( 'password' ).value;
				if ( email.length < 4 ) {
					alert( 'Please enter an email address.' );
					return;
				}
				if ( password.length < 4 ) {
					alert( 'Please enter a password.' );
					return;
				}
				// Sign in with email and pass.
				// [START authwithemail]
				firebase.auth().signInWithEmailAndPassword( email, password ).catch( function( error ) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					// [START_EXCLUDE]
					if ( errorCode === 'auth/wrong-password' ) {
						alert( 'Wrong password.' );
					} else {
						alert( errorMessage );
					}
					console.log( error );
					document.getElementById( 'quickstart-sign-in' ).disabled = false;
					// [END_EXCLUDE]
				} );
				// [END authwithemail]
			}
			document.getElementById( 'quickstart-sign-in' ).disabled = true;
		}
		$scope.handleSignUp = function() {
			var email = document.getElementById( 'email' ).value;
			var password = document.getElementById( 'password' ).value;
			if ( email.length < 4 ) {
				alert( 'Please enter an email address.' );
				return;
			}
			if ( password.length < 4 ) {
				alert( 'Please enter a password.' );
				return;
			}
			// Sign in with email and pass.
			// [START createwithemail]
			firebase.auth().createUserWithEmailAndPassword( email, password ).catch( function( error ) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// [START_EXCLUDE]
				if ( errorCode == 'auth/weak-password' ) {
					alert( 'The password is too weak.' );
				} else {
					alert( errorMessage );
				}
				console.log( error );
				// [END_EXCLUDE]
			} );
			// [END createwithemail]
		}
		$scope.auth = Auth;

		// any time auth state changes, add the user data to scope
		$scope.auth.$onAuthStateChanged( function( firebaseUser ) {
			$scope.firebaseUser = firebaseUser;
		} );
  }
] );


app.controller( 'yahtzeeCtrl', [ '$scope', '$firebaseArray', '$firebaseObject', 'currentAuth', function( $scope, $firebaseArray, $firebaseObject, currentAuth ) {
	// var ref = firebase.database().ref().child( "player1" );
	// 	$firebaseObject( ref ).$bindTo( $scope, "view.player1" );
	// 	var ref2 = firebase.database().ref().child( "player2" );
	//$firebaseObject( ref2 ).$bindTo( $scope, "view.player2" );
	var ref3 = firebase.database().ref().child( "view" );
	$firebaseObject( ref3 ).$bindTo( $scope, "view" );
	$scope.helddicearray = [];
	$scope.view = {};
	$scope.view.player1 = {};
	$scope.view.player2 = {};
	$scope.die0Held = false;
	$scope.die1Held = false;
	$scope.die2Held = false;
	$scope.die3Held = false;
	$scope.die4Held = false;
	$scope.helddicearray = [];
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
	$scope.view.rollsLeft = 3;
	$scope.initGame = function() {

		var ref = firebase.database().ref().child( "view" );
		$scope.view.player1.usedTwos = false;
		var obj = $firebaseObject( ref );
		obj.rollsLeft = 3;
		obj.turn = 1;
		obj.player1 = {};
		obj.player2 = {};
		obj.player1.aces = 0;
		obj.player1.twos = 0;
		obj.player1.threes = 0;
		obj.player1.fours = 0;
		obj.player1.fives = 0;
		obj.player1.sixes = 0;
		obj.player1.K3 = 0;
		obj.player1.K4 = 0;
		obj.player1.FH = 0;
		obj.player1.SmS = 0;
		obj.player1.LgS = 0;
		obj.player1.yahtzee = 0;
		obj.player1.chance = 0;
		obj.player1.upperbonus = 0;
		obj.player1.lowertotal = 0;
		obj.player1.uppertotal = 0;
		obj.player2.aces = 0;
		obj.player2.twos = 0;
		obj.player2.threes = 0;
		obj.player2.fours = 0;
		obj.player2.fives = 0;
		obj.player2.sixes = 0;
		obj.player2.K3 = 0;
		obj.player2.K4 = 0;
		obj.player2.FH = 0;
		obj.player2.SmS = 0;
		obj.player2.LgS = 0;
		obj.player2.yahtzee = 0;
		obj.player2.chance = 0;
		obj.player2.upperbonus = 0;
		obj.player2.lowertotal = 0;
		obj.player2.uppertotal = 0;
		obj.presentationSafe = true;
		obj.$save().then( function( ref ) {
			ref.key === obj.$id;
		} );
	};
	$scope.tossResult = [];
	$scope.view.viewResult = "";
	$scope.roll = function() {
		if ( $scope.view.rollsLeft > 0 ) {
			var result = "";
			for ( var i = 0; i < 5; i++ ) {
				if ( !$scope.helddicearray.includes( i ) ) {


					var num = Math.ceil( Math.random() * 6 );
					$scope.tossResult[ i ] = num;
				}
			}
			$scope.view.rollsLeft--;
			$scope.view.viewResult = $scope.tossResult.join( '' );
			// $scope.tossResult = resultArray;
		} else {
			alert( "You are out of rolls this turn!" );
		}
	};
	$scope.updateUpperSubScore = function( player ) {
		console.log( "fuck" );
		$scope.view[ player ].uppersubtotal = $scope.view[ player ].aces + $scope.view[ player ].twos + $scope.view[ player ].threes + $scope.view[ player ].fours + $scope.view[ player ].fives + $scope.view[ player ].sixes;
		$scope.checkUpperBonus( player );
	};
	$scope.checkUpperBonus = function( player ) {
		if ( $scope.view[ player ].uppersubtotal >= 63 ) {
			$scope.view[ player ].upperbonus = 35;
		}
		$scope.updateUpperScore( player );
	};
	$scope.updateUpperScore = function( player ) {
		$scope.view[ player ].uppertotal = $scope.view[ player ].uppersubtotal + $scope.view[ player ].upperbonus;
		$scope.updateGrandTotal( player );
	};
	$scope.updateGrandTotal = function( player ) {
		$scope.view[ player ].grandtotal = $scope.view[ player ].uppertotal + $scope.view[ player ].lowertotal;
		$scope.buttonClicked( player );
	};
	$scope.updateLowerScore = function( player ) {
		$scope.view[ player ].lowertotal = $scope.view[ player ].K3 + $scope.view[ player ].K4 + $scope.view[ player ].FH + $scope.view[ player ].SmS + $scope.view[ player ].LgS + $scope.view[ player ].yahtzee + $scope.view[ player ].chance;
		$scope.updateGrandTotal( player );
	};
	$scope.checkNumber = function( num, score, player ) {
		var count = 0;
		for ( var i = 0; i < 5; i++ ) {
			if ( $scope.view.viewResult[ i ] == num ) {
				count++;
			}
		}
		$scope.view[ player ][ score ] = count * num;
		$scope.updateUpperSubScore( player );
		var buttonToToggle = score + "Used";
		$scope.view[ player ][ buttonToToggle ] = true;
	};

	$scope.checkK3 = function( player ) {
		var resultSorted = $scope.tossResult.sort();
		if ( ( resultSorted[ 0 ] === resultSorted[ 1 ] && resultSorted[ 1 ] === resultSorted[ 2 ] ) || ( resultSorted[ 1 ] === resultSorted[ 2 ] && resultSorted[ 2 ] === resultSorted[ 3 ] ) || ( resultSorted[ 2 ] === resultSorted[ 3 ] && resultSorted[ 3 ] === resultSorted[ 4 ] ) ) {
			$scope.view[ player ].K3 = $scope.tossResult[ 0 ] + $scope.tossResult[ 1 ] + $scope.tossResult[ 2 ] + $scope.tossResult[ 3 ] + $scope.tossResult[ 4 ];
		} else {
			$scope.view[ player ].K3 = 0;
		}
		$scope.view[ player ].K3Used = true;
		$scope.updateLowerScore( player );
	};
	$scope.checkK4 = function( player ) {
		console.log( $scope.tossResult );
		var resultSorted = $scope.tossResult.sort();
		if ( ( resultSorted[ 0 ] === resultSorted[ 1 ] && resultSorted[ 0 ] === resultSorted[ 2 ] && resultSorted[ 0 ] === resultSorted[ 3 ] ) || ( resultSorted[ 1 ] === resultSorted[ 2 ] && resultSorted[ 1 ] === resultSorted[ 3 ] && resultSorted[ 1 ] === resultSorted[ 4 ] ) ) {
			$scope.view[ player ].K4 = $scope.tossResult[ 0 ] + $scope.tossResult[ 1 ] + $scope.tossResult[ 2 ] + $scope.tossResult[ 3 ] + $scope.tossResult[ 4 ];
		} else {
			$scope.view[ player ].K4 = 0;
		}
		$scope.view[ player ].K4Used = true;
		$scope.updateLowerScore( player );
	};
	$scope.checkFH = function( player ) {
		console.log( $scope.tossResult );
		var resultSorted = $scope.tossResult.sort();
		if ( ( resultSorted[ 0 ] === resultSorted[ 1 ] && resultSorted[ 2 ] === resultSorted[ 3 ] && resultSorted[ 2 ] === resultSorted[ 4 ] ) || ( resultSorted[ 0 ] === resultSorted[ 1 ] && resultSorted[ 0 ] === resultSorted[ 2 ] && resultSorted[ 3 ] === resultSorted[ 4 ] ) ) {
			$scope.view[ player ].FH = 25;
		} else {
			$scope.view[ player ].FH = 0;
		}
		$scope.view[ player ].FHUsed = true;
		$scope.updateLowerScore( player );
	};
	$scope.checkSmS = function( player ) {
		var resultSorted = $scope.tossResult.sort();
		if ( /1234|2345|3456/.test( resultSorted.join( "" ).replace( /(.)\1/, "$1" ) ) ) {
			$scope.view[ player ].SmS = 30;
		} else {
			$scope.view[ player ].SmS = 0;
		}
		$scope.view[ player ].SmSUsed = true;
		$scope.updateLowerScore( player );
	};
	$scope.checkLgS = function( player ) {
		var resultSorted = $scope.tossResult.sort();
		if ( /12345|23456/.test( resultSorted.join( "" ) ) ) {
			$scope.view[ player ].LgS = 40;
		} else {
			$scope.view[ player ].LgS = 0;
		}
		$scope.view[ player ].LgSUsed = true;
		$scope.updateLowerScore( player );
	};
	$scope.checkyahtzee = function( player ) {
		if ( $scope.tossResult[ 0 ] === $scope.tossResult[ 1 ] && $scope.tossResult[ 0 ] === $scope.tossResult[ 2 ] && $scope.tossResult[ 0 ] === $scope.tossResult[ 3 ] && $scope.tossResult[ 0 ] === $scope.tossResult[ 4 ] ) {
			$scope.view[ player ].yahtzee = 50;
		} else {
			$scope.view[ player ].yahtzee = 0;
		}
		$scope.view[ player ].yahtzeeUsed = true;
		$scope.updateLowerScore( player );
	};
	$scope.checkchance = function( player ) {
		console.log( $scope.tossResult );
		$scope.view[ player ].chance = $scope.tossResult[ 0 ] + $scope.tossResult[ 1 ] + $scope.tossResult[ 2 ] + $scope.tossResult[ 3 ] + $scope.tossResult[ 4 ];
		$scope.view[ player ].chanceUsed = true;
		$scope.updateLowerScore( player );
	};
	$scope.buttonClicked = function() {
		if ( $scope.view.turn > 26 && $scope.view.player1.grandtotal > $scope.view.player2.grandtotal ) {
			alert( "Game Over! Player 1 Wins by a score of " + $scope.view.player1.grandtotal + " to " + $scope.view.player2.grandtotal );
		} else if ( $scope.view.turn > 26 && $scope.view.player1.grandtotal === $scope.view.player2.grandtotal ) {
			alert( "Game Over! You tied!" );
		} else if ( $scope.view.turn > 26 && $scope.view.player1.grandtotal < $scope.view.player2.grandtotal ) {
			alert( "Game Over! Player 2 Wins by a score of " + $scope.view.player2.grandtotal + " to " + $scope.view.player1.grandtotal );
		}
		$scope.view.turn++;
		$scope.view.rollsLeft = 3;
		$scope.tossResult = [];
		$scope.view.viewResult = "";
		$scope.helddicearray = [];
	};
	$scope.toggleHoldDie = function( index ) {
		if ( $scope.helddicearray.includes( index ) ) {
			var indexToCut = $scope.helddicearray.indexOf( index );
			$scope.helddicearray.splice( indexToCut, 1 );
		} else {
			$scope.helddicearray.push( index );
		}
		console.log( $scope.helddicearray );
	};
} ] );

app.controller( 'IndexController', [ '$scope', '$firebaseArray', function( $scope, $firebaseArray ) {} ] );
