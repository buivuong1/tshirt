module.exports = function(sequelize, DataTypes){
	var products_images = sequelize.define("products_images", {
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
		product_id: {
			type: DataTypes.INTEGER
		},
		type: {
			type: DataTypes.CHAR
		},
		path: {
			type: DataTypes.STRING
		}
	}, {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		classMethods: {
			associate: function(models) {
				products_images.belongsTo(models.products, {
					foreignKey: 'product_id'
				})
	    	}
	    }
	})

	products_images.__factory = {autoIncrementField: 'id'};
	products_images.id = '';

	return products_images;
}