var models = require('../models');
var Config = require('../config/app');
var uuid = require('node-uuid');

module.exports = {
	postCreate: function(req, res){
		var uid = uuid.v4();
		console.log(uid);

		models.products.create({
			name: 'Áo thun in toàn mặt',
			type: 'tshirt'
		})
	},
	getListAll: function(req, res){
		models.products.findAll({
			attributes: ['name', 'uid'],
			include: [
				{
					model: models.products_images, 
					required: false, 
					attributes: ['path', 'uid', 'type', 'product_id'],
					where: {enabled: 'yes'}
				}
			],
			where: {enabled: 'yes'}
		})
		.then(function(productList){
			res.json({data: productList});
		}, function(error){
			res.status(500).json({error: error});
		})
	},
	postDetail: function(req, res){
		var uid = req.body.uid;

		models.products.findOne({
			attributes: ['name', 'uid'],
			include: [
				{
					model: models.products_images, 
					required: false, 
					attributes: ['path', 'uid', 'type', 'product_id'],
					where: {enabled: 'yes', 'type': 'canvas'}
				}
			],
			where: {enabled: 'yes', uid: uid}
		})
	}
}