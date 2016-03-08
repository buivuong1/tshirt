var express = require('express');
var app = express();
var models = require('./models');

var compress = require('compression');
app.use(compress({
	threshold : 0, // or whatever you want the lower threshold to be
	 filter    : function(req, res) {
	    var ct = res.get('content-type');
	    return true;
	 }
}));

app.set('view engine', 'ejs');
app.use('/images', express.static(__dirname + '/images'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  	extended: true
}));

var cors = require('cors');
app.use(cors());

var router = express.Router();
require('./routes')(router);

app.use(router);
app.set('port', 4001);

models.sequelize.sync().then(function () {
  	var server = app.listen(app.get('port'), function() {
    	console.log('Express server listening on port ' + server.address().port);
  	});
});