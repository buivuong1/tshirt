var models = require('./models');
var moment = require('moment');
var uuid = require('node-uuid');
var Config = require('./config/app');

module.exports = {
	isAuthenticated: function(req, res, next){
		var token = req.body.token;
		models.users.findOne({
			where: {token_login: token}
		})
		.then(function(user){
			if(user){
				var today = moment();
				var expire_day = moment(user.token_expire_at);
				console.log(today.format('YYYY-MM-DD HH:mm:ss')+' '+expire_day.format('YYYY-MM-DD HH:mm:ss'));
				if(today.isBefore(expire_day)){
					next();
				}else{
					var diff = today.diff(expire_day);
					var request_timeout = Config.request_timeout*60000;
					if(diff >= request_timeout){//10 minutes
						res.status(401).json({message: 'API hết hạn. Mời bạn đăng nhập lại'});
					}else{
						models.users.update({
							token_expire_at: today.add(Config.request_timeout,'minutes').format('YYYY-MM-DD HH:mm:ss')
						},{
							where: {id: user.id}
						})
						.then(function(){
							next();
						}, function(){
							res.status(401).json({message: 'Server gặp vấn đề về database'});
						})
					}
				}
			}else{
				res.status(401).json({message: 'Bạn không có quyền truy cập api này'});
			}
		})
	}
}