var Editor = require('partials/editor');
var ProductsCarousel = require('partials/carousel');
var EditorControl = require('partials/editorControl');
var Config = require('config');

var Canvas = React.createClass({
	componentDidMount: function(){

	},
	_onInitProduct: function(item){
		this.refs.editor.setItem(item);
	},
	_onSlideMainImage: function(position, value){
		this.refs.editor.setScaleForMainImage(value);
	},
	_onChangeUpload: function(base64Image, file){
		var self = this;
		var image = new Image();
		image.onload = function(){
			self.refs.editor.setMainImage(base64Image, image);
			self.refs.editorControl.refreshSlider();
		}
		image.src = base64Image;
	},
	render: function(){
		return (
			<div className="ui fluid container">
				<div className="ui padded grid">
					<div className="row">
						<div className="column">
							<ProductsCarousel onInitProduct={this._onInitProduct}/>
						</div>
					</div>
					<div className="row">
						<div style={{width: Config.canvas.tshirtWidth}}>
							<Editor ref="editor"/>
						</div>
						<div style={{width: Config.editorControl.width}}>
							<EditorControl ref="editorControl"
								onSlideMainImage={this._onSlideMainImage}
								onChangeUpload={this._onChangeUpload}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

ReactDOM.render(<Canvas/>, document.getElementById('app'));