module.exports = function(router){
	require('./users')(router);
	require('./products')(router);
	require('./products_images')(router);
}