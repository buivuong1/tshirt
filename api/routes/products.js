var ProductsController = require('../controllers/products');
var Middleware = require('../middleware');

module.exports = function(router){
	router.post('/products/create', ProductsController.postCreate);
	router.get('/products/listAll', ProductsController.getListAll);
}