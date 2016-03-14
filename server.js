var express = require('express');
var app = express();

var compress = require('compression');
app.use(compress({
	threshold : 0, // or whatever you want the lower threshold to be
	 filter    : function(req, res) {
	    var ct = res.get('content-type');
	    return true;
	 }
}));

app.set('view engine', 'ejs');
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  	extended: true
}));

var cors = require('cors');
app.use(cors());

app.listen(80, function(){
	console.log('Listen on 80');
})