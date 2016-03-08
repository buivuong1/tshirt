var models = require('../models');
var Config = require('../config/app');
var uuid = require('node-uuid');

module.exports = {
	postCreate: function(req, res){
		models.rel_images.create({
			ref_table: 'products',
			ref_id: 1,
			type: 'canvas',
			path: 'images/products/380afdd4-f1a4-41dc-a142-b9958b610b2d.png',
			created_by: 1,
			updated_by: 1
		})
		.then(function(){
			res.json('saasas');
		})
	}
}