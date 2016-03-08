module.exports = function(sequelize, DataTypes){
	var cities = sequelize.define("cities", {
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
		code: {
			type: DataTypes.CHAR
		}
	}, {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		classMethods: {
			associate: function(models){
				cities.hasOne(models.users_infos, {
					foreignKey: 'city_id'
				})
			}
		}
	})

	cities.__factory = {autoIncrementField: 'id'};
	cities.id = '';

	return cities;
}