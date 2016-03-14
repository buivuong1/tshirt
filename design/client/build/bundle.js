/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var Editor = __webpack_require__(1);
	var ProductsCarousel = __webpack_require__(4);
	var EditorControl = __webpack_require__(6);
	var Config = __webpack_require__(2);

	var Canvas = React.createClass({displayName: "Canvas",
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
				React.createElement("div", {className: "ui fluid container"}, 
					React.createElement("div", {className: "ui padded grid"}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "column"}, 
								React.createElement(ProductsCarousel, {onInitProduct: this._onInitProduct})
							)
						), 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {style: {width: Config.canvas.tshirtWidth}}, 
								React.createElement(Editor, {ref: "editor"})
							), 
							React.createElement("div", {style: {width: Config.editorControl.width}}, 
								React.createElement(EditorControl, {ref: "editorControl", 
									onSlideMainImage: this._onSlideMainImage, 
									onChangeUpload: this._onChangeUpload})
							)
						)
					)
				)
			)
		}
	})

	ReactDOM.render(React.createElement(Canvas, null), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var Config = __webpack_require__(2);
	var Canvas = __webpack_require__(3);

	module.exports = React.createClass({displayName: "module.exports",
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
						html_main_image = (React.createElement("img", {src: path, className: "lazy"}));
					}
				})
			}

			return (
				React.createElement("div", {style: {position: 'relative'}}, 
					html_main_image, 
					React.createElement(Canvas, {ref: "canvas", zIndex: 1})
				)
			)
		}
	})

/***/ },
/* 2 */
/***/ function(module, exports) {

	/** @jsx React.DOM */var api = 'http://localhost:4001/';

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var Config = __webpack_require__(2);

	// USE KONVA.JS
	// WEB: https://konvajs.github.io
	module.exports = React.createClass({displayName: "module.exports",
		stage: null,
		layerBottom: null,
		layerFront: null,
		propTypes: {
			zIndex: React.PropTypes.number
		},
		create: function(width, height){
			this.stage = new Konva.Stage({
				container: this.refs.canvas,
				width: width,
				height: height
			});
			this.layerBottom = new Konva.Layer();
			this.stage.add(this.layerBottom);
			this.layerFront = new Konva.Layer({listening: false});
			this.stage.add(this.layerFront);
		},
		fromURL: function(pathImage){
			var self = this;
			var imageObj = new Image();
			imageObj.onload = function(){
			  	var image = new Konva.Image({
			    	image: imageObj
			  	});
			  	self.layerFront.add(image);
				self.layerFront.draw();
			};
			imageObj.src = pathImage;
		},
		setMainImage: function(pathImage, object){
			var c = document.createElement('canvas');
			c.width = Math.ceil(object.width/Config.canvas.ratio);
			c.height = Math.ceil(object.height/Config.canvas.ratio);
			var ctx = c.getContext('2d');
			ctx.drawImage(object, 0, 0, c.width, c.height);
			var b64str = c.toDataURL('image/jpeg');
			
			var mainImage = this.getMainImage();
			if(typeof mainImage !== 'undefined')
				mainImage.remove();

			var self = this;
			var imageObj = new Image();
			if(object.width < Config.canvas.A1.width){
				var diff = Config.canvas.A1.width/object.width;
				c.width = diff*c.width;
				c.height = diff*c.height;
			}
			var x = y = 0;

			if(c.width < this.stage.width()){
				x = (this.stage.width()-c.width)/2;
				y = (this.stage.height()-c.height)/2;
			}

			imageObj.onload = function(){
			  	var image = new Konva.Image({
			    	image: imageObj,
			    	width: c.width,
			    	height: c.height,
			    	draggable: true,
			    	id: 'mainImage',
			    	x: x,
			    	y: y
			  	});
			  	self.layerBottom.add(image);
				self.layerBottom.draw();
			};
			imageObj.src = b64str;
		},
		setFirstMainImage: function(pathImage){
			var self = this;
			var imageObj = new Image();
			imageObj.onload = function(){
			  	var image = new Konva.Image({
			    	image: imageObj,
			    	draggable: true,
			    	id: 'mainImage'
			  	});
			  	self.layerBottom.add(image);
				self.layerBottom.draw();
			};
			imageObj.src = pathImage;
		},
		scaleMainImage: function(value){
			var node = this.getMainImage();
			if(typeof node !== 'undefined'){
				node.scale({
					x: value,
					y: value
				});
			}
			
			this.layerBottom.draw();
		},
		getMainImage: function(){
			return this.stage.find('#mainImage')[0];
		},
		render: function(){
			return React.createElement("div", {ref: "canvas", style: {position: 'absolute', left: 0, top: 0, zIndex: this.props.zIndex}})
		}
	})

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var Services = __webpack_require__(5);
	var Config = __webpack_require__(2);

	module.exports = React.createClass({displayName: "module.exports",
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
				React.createElement("div", {ref: "carousel"}, 
					
						this.items.map(function(item, index){
							var html_main_image = null;
							var products_images = item.products_images;
							for(var i = 0; i < products_images.length; i++){
								var products_images_item = products_images[i];
								var path = Config.api+products_images_item.path;
								if(products_images_item.type === 'main'){
									html_main_image = (React.createElement("img", {className: "owl-lazy", "data-src": path, style: {width: Config.thumbnail}}));
									break;
								}
							}
							return html_main_image;
						})
					
				)
			)
		}
	})

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var Config = __webpack_require__(2);

	module.exports = {
		GetListProducts: function(){
			return new Promise(function(resolve, reject){
				$.ajax({
					type: 'GET',
					url: Config.api+'products/listAll',
				})
				.done(function(data){
					resolve(data);
				})
				.fail(function(jqXHR, textStatus, errorThrown){
					reject(textStatus);
				})
			})
		}
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var InputRange = __webpack_require__(7);
	var InputFile = __webpack_require__(8);
	var Config = __webpack_require__(2);
	var Dropdown = __webpack_require__(9);

	module.exports = React.createClass({displayName: "module.exports",
		propTypes: {
			onSlideMainImage: React.PropTypes.func,
			onChangeUpload: React.PropTypes.func
		},
		refreshSlider: function(){
			this.refs.range.setValue(Config.range.value);
		},
		render: function(){
			return (
				React.createElement("div", {className: "ui padded grid"}, 
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "column"}, 
							React.createElement(InputFile, {ref: "file", text: "TẢI HÌNH YÊU THÍCH CỦA BẠN LÊN ÁO", 
								onChangeUpload: this.props.onChangeUpload})
						)
					), 
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "column"}, 
							React.createElement(InputRange, {ref: "range", max: Config.range.max, min: Config.range.min, value: Config.range.value, step: Config.range.step, 
								onSlide: this.props.onSlideMainImage})
						)
					), 
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "column"}, 
							React.createElement("button", {className: "ui fluid button primary"}, "ĐĂNG ÁO LÊN TRANG CHỦ")
						)
					), 
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "column"}, 
							React.createElement("button", {className: "ui fluid button primary"}, "HỢP TÁC VỚI CHÚNG TÔI")
						)
					), 
					React.createElement("div", {className: "three column row"}, 
						React.createElement("div", {className: "column"}
						), 
						React.createElement("div", {className: "column"}, 
							React.createElement("input", null)
						), 
						React.createElement("div", {className: "column"}, 
							React.createElement("button", {className: "ui fluid button primary"}, 
								"MUA ÁO"
							)
						)
					)
				)
			)
		}
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	/** @jsx React.DOM */module.exports = React.createClass({displayName: "module.exports",
		propTypes: {
			value: React.PropTypes.number,
			min: React.PropTypes.number,
			max: React.PropTypes.number,
			step: React.PropTypes.number,
			onSlide: React.PropTypes.func
		},
		setValue: function(value){
			$(this.refs.input).val(value).change();
		},
		componentDidMount: function(){
			var self = this;
			$(this.refs.input).rangeslider({
				polyfill: false,
				onSlide: function(position, value){
					self.props.onSlide(position, value);
				}
			});
		},
		render: function(){
			return (
				React.createElement("input", {type: "range", ref: "input", 
					value: this.props.value, 
					min: this.props.min, 
					max: this.props.max, 
					step: this.props.step})
			)
		}
	})

/***/ },
/* 8 */
/***/ function(module, exports) {

	/** @jsx React.DOM */module.exports = React.createClass({displayName: "module.exports",
		propTypes: {
			text: React.PropTypes.string
		},
		base64Image: null,
		file: null,
		componentDidMount: function(){
			var self = this;
			var _URL = window.URL || window.webkitURL;
			$(this.refs.file).jfilestyle({input:false, buttonText: this.props.text});
			$(this.refs.file).change(function(){
				if(this.files && this.files[0]){
					self.file = this.files[0];
					var FR = new FileReader();
					FR.onload = function(event){
						self.base64Image = event.target.result;
						self.props.onChangeUpload(self.base64Image, self.file);
					}
					FR.readAsDataURL(this.files[0]);
					$(self.refs.file).jfilestyle('clear');
				}
			});
		},
		getBase64Image: function(){
			return this.base64Image;
		},
		getFile: function(){
			return this.file;
		},
		render: function(){
			return React.createElement("input", {type: "file", ref: "file", accept: "image/*"})
		}
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	/** @jsx React.DOM */module.exports = React.createClass({displayName: "module.exports",
		propTypes: {
			code: React.PropTypes.string,
			name: React.PropTypes.string,
			list: React.PropTypes.array,
			placeholder: React.PropTypes.string
		},
		componentDidMount: function(){
			$(this.refs.dropdown).dropdown();
		},
		setSelected: function(value){
			$(this.refs.dropdown).dropdown('set selected', value);
		},
		render: function(){
			return (
				React.createElement("div", {className: "ui selection dropdown", ref: "dropdown"}, 
					React.createElement("input", {type: "hidden", ref: "input"}), 
					React.createElement("i", {className: "dropdown icon"}), 
					React.createElement("div", {className: "default text"}, this.props.placeholder), 
					React.createElement("div", {className: "menu"}, 
						
							this.props.list.map(function(item, index){
								return React.createElement("div", {className: "item", "data-value": item.code}, item.name)
							})
						
					)
				)
			)
		}
	})

/***/ }
/******/ ]);