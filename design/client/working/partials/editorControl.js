var InputRange = require('common/range');
var InputFile = require('common/chosen');
var Config = require('config');
var Dropdown = require('common/dropdown');

module.exports = React.createClass({
	propTypes: {
		onSlideMainImage: React.PropTypes.func,
		onChangeUpload: React.PropTypes.func
	},
	refreshSlider: function(){
		this.refs.range.setValue(Config.range.value);
	},
	render: function(){
		return (
			<div className="ui padded grid">
				<div className="row">
					<div className="column">
						<InputFile ref="file" text="TẢI HÌNH YÊU THÍCH CỦA BẠN LÊN ÁO"
							onChangeUpload={this.props.onChangeUpload}/>
					</div>
				</div>
				<div className="row">
					<div className="column">
						<InputRange ref="range" max={Config.range.max} min={Config.range.min} value={Config.range.value} step={Config.range.step}
							onSlide={this.props.onSlideMainImage}/>
					</div>
				</div>
				<div className="row">
					<div className="column">
						<button className="ui fluid button primary">ĐĂNG ÁO LÊN TRANG CHỦ</button>
					</div>
				</div>
				<div className="row">
					<div className="column">
						<button className="ui fluid button primary">HỢP TÁC VỚI CHÚNG TÔI</button>
					</div>
				</div>
				<div className="three column row">
					<div className="column">
					</div>
					<div className="column">
						<input/>
					</div>
					<div className="column">
						<button className="ui fluid button primary">
							MUA ÁO
						</button>
					</div>
				</div>
			</div>
		)
	}
});