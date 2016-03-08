var express = require('express');
var app = express();
var path = require('path');

var compress = require('compression');
app.use(compress({
	threshold : 0, // or whatever you want the lower threshold to be
	 filter    : function(req, res) {
	    var ct = res.get('content-type');
	    return true;
	 }
}));

app.set('view engine', 'ejs');
app.use('/client', express.static(__dirname + '/client'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/client/favicon.ico'));

app.get('/', function(req, res){
	res.render('index.ejs');
});

app.listen(4000, function(){
	console.log('Listen on 4000');
})