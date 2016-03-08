module.exports = function(sequelize, DataTypes){
	var users = sequelize.define("users", {
		uid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		created_by: {
			type: DataTypes.INTEGER
		},
		updated_by: {
			type: DataTypes.INTEGER
		},
		enabled: {
			type: DataTypes.CHAR,
			defaultValue: 'yes'
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: {
					args: [true],
					msg: 'Bạn phải nhập email'
				}
			}
		},
		password: {
			type: DataTypes.STRING
		},
		token_login: {
			type: DataTypes.STRING
		},
		last_login_at: {
			type: DataTypes.DATE
		},
		token_check_status: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.ENUM('active','unactive','spam'),
			defaultValue: 'unactive'
		},
		login_type: {
			type: DataTypes.ENUM('facebook','gplus','local'),
			defaultValue: 'local'
		},
		type: {
			type: DataTypes.ENUM('admin','client'),
			defaultValue: 'client'
		},
		token_expire_at: {
			type: DataTypes.DATE
		}
	}, {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		classMethods: {
			associate: function(models){
				users.hasOne(models.users_infos, {
					foreignKey: 'user_id'
				})
			}
		}
	})

	users.__factory = {autoIncrementField: 'id'};
	users.id = '';
	return users;
}