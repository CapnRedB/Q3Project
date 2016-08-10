var express = require( 'express' );
var server = express();
var bodyParser = require( 'body-parser' );
<<<<<<< HEAD
var app = angular.module('yahtzeeApp', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
  .when('signin', {
    templateUrl: '../../signin',
    controller: 'yahtzeeCtrl'
  });
});

=======
app.use( bodyParser.json() )
	.use( bodyParser.urlencoded( {
		extened: false
	} ) )
>>>>>>> 0b7b7eda3c5d76a919773d98e7d8b6c980ba94ba
server.use( express.static( 'public' ) ); //Don't forget this line ever again..

server.get( '*', ( req, res ) => {
	res.sendFile( __dirname + '/public/index.html' )
} )
server.listen( 3000, ( req, res ) => {
	console.log( 'listening on 3000' );
} )
