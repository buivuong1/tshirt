module.exports = function(sequelize, DataTypes){
	var products = sequelize.define("products", {
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
		type: {
			type: DataTypes.CHAR
		},
		description: {
			type: DataTypes.STRING
		},
		content: {
			type: DataTypes.TEXT
		}
	}, {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		classMethods: {
			associate: function(models) {
				products.hasMany(models.products_images, {
					foreignKey: 'product_id'
				})
	    	}
	    }
	})

	products.__factory = {autoIncrementField: 'id'};
	products.id = '';

	return products;
}