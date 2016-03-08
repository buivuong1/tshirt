module.exports = function(sequelize, DataTypes){
	var users_infos = sequelize.define("users_infos", {
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
		name: {
			type: DataTypes.STRING
		},
		phone: {
			type: DataTypes.CHAR
		},
		address: {
			type: DataTypes.STRING
		},
		city_id: {
			type: DataTypes.INTEGER
		},
		sex: {
			type: DataTypes.ENUM('male','female')
		},
		description: {
			type: DataTypes.STRING
		},
		avatar: {
			type: DataTypes.STRING
		},
		content: {
			type: DataTypes.TEXT
		},
		user_id: {
			type: DataTypes.INTEGER
		}
	}, {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		classMethods: {
			associate: function(models){
				users_infos.belongsTo(models.users, {
					foreignKey: 'user_id'
				});
				users_infos.belongsTo(models.cities, {
					foreignKey: 'city_id'
				})
			}
		}
	})

	users_infos.__factory = {autoIncrementField: 'id'};
	users_infos.id = '';

	return users_infos;
}