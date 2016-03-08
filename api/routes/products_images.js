var ProductsImagesController = require('../controllers/products_images');
var Middleware = require('../middleware');

module.exports = function(router){
	router.post('/products_images/create', ProductsImagesController.postCreate);
}