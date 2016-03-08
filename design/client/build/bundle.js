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
	var ProductsCarousel = __webpack_require__(2);

	var Canvas = React.createClass({displayName: "Canvas",
		componentDidMount: function(){

		},
		render: function(){
			return (
				React.createElement("div", {className: "ui fluid container"}, 
					React.createElement("div", {className: "ui padded grid"}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "column"}, 
								React.createElement(ProductsCarousel, null)
							)
						), 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "column"}, 
								React.createElement(Editor, null)
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
/***/ function(module, exports) {

	/** @jsx React.DOM */module.exports = React.createClass({displayName: "module.exports",
		render: function(){
			return (
				React.createElement("div", null, 
					"Editor"
				)
			)
		}
	})

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var Services = __webpack_require__(3);
	var Config = __webpack_require__(4);

	module.exports = React.createClass({displayName: "module.exports",
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
				React.createElement("div", {ref: "carousel"}, 
					
						this.items.map(function(item, index){
							var image = Config.api+item.products_images[0].path;
							return (
								React.createElement("img", {className: "owl-lazy", "data-src": image, style: {width: Config.thumbnail}})
							)
						})
					
				)
			)
		}
	})

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var Config = __webpack_require__(4);

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
/* 4 */
/***/ function(module, exports) {

	/** @jsx React.DOM */var api = 'http://localhost:4001/';

	module.exports = {
		api: api,
		thumbnail: '85px',
		canvas: {
			shirt: '500px'
		}
	}

/***/ }
/******/ ]);