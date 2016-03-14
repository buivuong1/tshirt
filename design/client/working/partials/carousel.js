var Services = require('services');
var Config = require('config');

module.exports = React.createClass({
	items: [],
	propTypes: {
		onInitProduct: React.PropTypes.func
	},
	componentDidMount: function(){
		this._serverGetListAllProducts();
	},
	componentWillUnmount: function(){
		this.items = [];
	},
	_serverGetListAllProducts: function(){
		var self = this;
		Config.showLoader();
		Services.GetListProducts()
		.then(function(response){
			self.items = response.data;
			self.props.onInitProduct(self.items[0]);
			self.forceUpdate(function(){
				setTimeout(function(){
					$(self.refs.carousel).owlCarousel({
						margin: 10,
						loop: true,
						items: 10,
						center: true,
						lazyLoad: true,
						autoplay:true,
    					autoplayTimeout:1000,
    					autoplayHoverPause:true
					})
				})
				Config.hideLoader();
			})
		}, function(error){
			
		})
	},
	render: function(){
		return (
			<div ref="carousel">
				{
					this.items.map(function(item, index){
						var html_main_image = null;
						var products_images = item.products_images;
						for(var i = 0; i < products_images.length; i++){
							var products_images_item = products_images[i];
							var path = Config.api+products_images_item.path;
							if(products_images_item.type === 'main'){
								html_main_image = (<img className="owl-lazy" data-src={path} style={{width: Config.thumbnail}}/>);
								break;
							}
						}
						return html_main_image;
					})
				}
			</div>
		)
	}
})