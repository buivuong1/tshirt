var Editor = require('common/editor');
var ProductsCarousel = require('common/carousel');

var Canvas = React.createClass({
	componentDidMount: function(){

	},
	render: function(){
		return (
			<div className="ui fluid container">
				<div className="ui padded grid">
					<div className="row">
						<div className="column">
							<ProductsCarousel/>
						</div>
					</div>
					<div className="row">
						<div className="column">
							<Editor/>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

ReactDOM.render(<Canvas/>, document.getElementById('app'));