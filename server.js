var express = require( 'express' );
var server = express();
var bodyParser = require( 'body-parser' );
server.use( bodyParser.json() )
	.use( bodyParser.urlencoded( {
		extened: false
	} ) )
server.use( express.static( 'public' ) ); //Don't forget this line ever again..

server.get( '*', ( req, res ) => {
	res.sendFile( __dirname + '/public/index.html' )
} )
server.listen( 3000, ( req, res ) => {
	console.log( 'listening on 3000' );
} )
