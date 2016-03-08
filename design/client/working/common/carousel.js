var Services = require('services');
var Config = require('config');

module.exports = React.createClass({
	items: [],
	componentDidMount: function(){
		this._serverGetListAllProducts();
	},
	componentWillUnmount: function(){
		this.items = [];
	},
	_serverGetListAllProducts: function(){
		var self = this;
		Services.GetListProducts()
		.then(function(response){
			self.items = response.data;
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
			})
		}, function(error){
			
		})
	},
	render: function(){
		return (
			<div ref="carousel">
				{
					this.items.map(function(item, index){
						var image = Config.api+item.products_images[0].path;
						return (
							<img className="owl-lazy" data-src={image} style={{width: Config.thumbnail}}/>
						)
					})
				}
			</div>
		)
	}
})