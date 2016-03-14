var Config = require('config');
var Canvas = require('partials/canvas');

module.exports = React.createClass({
	item: null,
	setItem: function(item){
		var self = this;
		this.item = item;
		this.refs.canvas.create(Config.canvas.tshirtWidth, Config.canvas.tshirtWidth);
		var products_images = this.item.products_images;
		products_images.map(function(products_images_item){
			var path = Config.api+products_images_item.path;
			if(products_images_item.type === 'canvas'){
				self.refs.canvas.fromURL(path);
				self.refs.canvas.setFirstMainImage(Config.api+'images/mainDesign.png');
			}
		})
		this.forceUpdate();
	},
	setMainImage: function(base64Data, image){
		this.refs.canvas.setMainImage(base64Data, image);
	},
	setScaleForMainImage: function(value){
		this.refs.canvas.scaleMainImage(value);
	},
	render: function(){
		var html_main_image = null;
		var html_canvas_image = null;
		if(this.item){
			var products_images = this.item.products_images;
			products_images.map(function(products_images_item){
				var path = Config.api+products_images_item.path;
				if(products_images_item.type === 'main'){
					html_main_image = (<img src={path} className="lazy"/>);
				}
			})
		}

		return (
			<div style={{position: 'relative'}}>
				{html_main_image}
				<Canvas ref="canvas" zIndex={1}/>
			</div>
		)
	}
})