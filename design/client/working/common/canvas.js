// USE KONVA.JS
// WEB: https://konvajs.github.io
module.exports = React.createClass({
	stage: null,
	layer: null,
	create: function(width, height){
		this.stage = new Konva.Stage({
			container: this.refs.canvas,
			width: width,
			height: height
		})
		this.layer = new Konva.Layer();
		this.layer.on('click', function(event){
			console.log(event.target.getText());
		});
		this.stage.add(this.layer);
	},
	addText: function(text){
		var text = new Konva.Text({
			x: 0,
			y: 0,
			text: 'Bùi Vương chết tiệt',
			fontSize: 18,
			fontFamily: 'Times New Roman',
			fill: '#555',
			width: 300,
			padding: 20,
			align: 'center',
			draggable: true
		});
		this.layer.add(text);
		this.layer.draw();
	},
	render: function(){
		return <div ref="canvas" style={{backgroundColor: 'lightgrey'}}/>
	}
})