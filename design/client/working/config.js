var api = 'http://localhost:4001/';

module.exports = {
	api: api,
	thumbnail: '85px',
	canvas: {
		tshirtWidth: 600,
		ratio: 3,
		A1: {
			width: 1124
		}
	},
	editorControl: {
		width: 400
	},
	range: {
		max: 2,
		min: 0.1,
		step: 0.1,
		value: 1
	},
	showLoader: function(){
		HoldOn.open({
		  	theme:"sk-bounce",
		  	message: "Bạn chờ chút xíu nha. Đang tải"
		});
	},
	hideLoader: function(){
		HoldOn.close();
	}
}