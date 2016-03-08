var UsersController = require('../controllers/users');
var Middleware = require('../middleware');

module.exports = function(router){
	router.post('/users/createAdmin', UsersController.postCreateAdmin);
	router.post('/users/login', UsersController.postLogin);
	router.post('/users/listAll', Middleware.isAuthenticated, UsersController.postListAll);
}