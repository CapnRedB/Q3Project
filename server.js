var express = require( 'express' );
var server = express();
var bodyParser = require( 'body-parser' );

server.get( '*', ( req, res ) => {
	res.sendFile( __dirname + '/public/index.html' )
} )
server.listen( 3000, ( req, res ) => {
	console.log( 'listening on 3000' );
} )
