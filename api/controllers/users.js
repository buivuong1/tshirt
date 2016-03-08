var models = require('../models');
var passwordHash = require('password-hash');
var uuid = require('node-uuid');
var moment = require('moment');
var Config = require('../config/app');

module.exports = {
	postListAll: function(req, res){
		res.send("Hello");
	},
	postCreateAdmin: function(req, res){
		var email = req.body.email;
		var password = req.body.password;
		var hashedPassword = passwordHash.generate(password);

		models.sequelize.transaction({autocommit: false}, function(t){
			return models.users.create({
				email: email,
				password: hashedPassword,
				type: 'admin',
				status: 'active'
			},{transaction: t})
			.then(function(userCreated){
				return models.users_infos.create({
					user_id: userCreated.id,
					created_by: userCreated.id,
					updated_by: userCreated.id
				}, {transaction: t})
			}, function(error){
				t.rollback();
				res.status(400).json(error);
			})
			.then(function(userInfoCreated){
				t.commit();
				res.json(userInfoCreated);
			}, function(error){
				t.rollback();
				res.status(400).json(error);
			})
		})
	},
	postLogin: function(req, res){
		var email = req.body.email;
		var password = req.body.password;

		models.users.findOne({
			where: {email: email}
		})
		.then(function(user){
			if(user){
				if(!passwordHash.verify(password, user.password)){
					res.status(400).json({error: 'Bạn nhập mật khẩu sai'});
				}else{
					var today = moment();
					var today_token_expire = moment().add(Config.request_timeout,'minutes');
					var token_login = uuid.v4();

					models.users.update({
						token_login: token_login,
						last_login_at: today.format('YYYY-MM-DD HH:mm:ss'),
						token_expire_at: today_token_expire.format('YYYY-MM-DD HH:mm:ss')
					}, {
						where: {email: email}
					})
					.then(function(modelsUpdated){
						if(modelsUpdated){
							res.json({email: email, token: token_login, token_expire: today_token_expire});
						}
					})
				}
			}else{
				res.status(400).json({error: 'Bạn nhập email hay mật khẩu sai'});
			}
		})
	}
}