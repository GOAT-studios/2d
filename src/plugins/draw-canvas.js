

var Draw = function(options) {
	var draw = this;

//Configuration
	if(!options) var options = {};
	if(!options.defaultConfig) options.defaultConfig = {};

	var X = this.x = options.x || 0;
	var Y = this.y = options.y || 0;
	var width  = this.width  = options.width  || 35;
	var height = this.height = options.height || 35;

	var domElement = this.domElement = document.createElement("canvas");
	var ctx = this.context = this.domElement.getContext("2d");
	
	var defaultConfig = Game.prototype.Utils.merge({}, ctx, ["canvas", "currentPath"]);
	defaultConfig = this.defaultConfig = Game.prototype.Utils.merge(defaultConfig, options.defaultConfig);



//DrawInstance
		
	this.instance = {
		//Properties
		strokeStyle: function(style) {
			ctx.strokeStyle = style;
			return this;
		},
		fillStyle: function(style) {
			ctx.fillStyle = style;
			return this;
		},
		lineWidth: function(w) {
			ctx.lineWidth = w;
			return this;
		},
		lineDashOffset: function(offset) {
			ctx.lineDashOffset = offset;
			return this;
		},

		//Basics
		stroke: function() {
			ctx.stroke();
			return this;
		},
		fill: function() {
			ctx.fill();
			return this;
		},
		beginPath: function() {
			ctx.beginPath();
			return this;
		},
		closePath: function() {
			ctx.closePath();
			return this;
		},
		clip: function() {
			ctx.clip();
			return this;
		},
		clearRect: function(x, y, w, h) {
			ctx.clearRect(x+X, y+Y, w, h);
			return this;
		},
		save: function() {
			ctx.save();
			return this;
		},
		restore: function() {
			ctx.restore();
			return this;
		},

		//Paths
		moveTo: function(x, y) {
			ctx.moveTo(x+X, y+Y);
			return this;
		},
		lineTo: function(x, y) {
			ctx.lineTo(x+X, y+Y);
			return this;
		},
		rect: function(x, y, w, h) {
			ctx.rect(x+X, y+Y, w, h);
			return this;
		},
		arc: function(x, y, r, sa, ea, cc) {
			ctx.arc(x+X, y+Y, r, sa, ea, cc);
			return this;
		},
		arcTo: function(x1, y1, x2, y2, r) {
			ctx.arcTo(x1+X, y1+Y, x2+X, y2+Y, r);
			return this;
		},
		quadraticCurveTo: function(cpx, cpy, x, y) {
			ctx.quadraticCurveTo(cpx+X, cpy+Y, x+X, y+Y);
			return this;
		},
		bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
			ctx.bezierCurveTo(cp1x+X, cp1y+Y, cp2x+X, cp2y+Y, x+X, y+Y);
			return this;
		},

		//Basic shapes
		strokeRect: function(x, y, w, h) {
			ctx.strokeRect(x+X, y+Y, w, h);
			return this;
		},
		fillRect: function(x, y, w, h) {
			ctx.fillRect(x+X, y+Y, w, h);
			return this;
		},
		fullRect: function(x, y, w, h) {
			ctx.strokeRect(x+X, y+Y, w, h);
			ctx.fillRect(x+X, y+Y, w, h);
			return this;
		},
		strokeCircle: function(x, y, r) {
			ctx.beginPath();
			ctx.arc(x+X, y+Y, 0, 2*Math.PI);
			ctx.stroke();
			return this;
		},
		fillCircle: function(x, y, r) {
			ctx.beginPath();
			ctx.arc(x+X, y+Y, 0, 2*Math.PI);
			ctx.fill();
			return this;
		},
		fullCircle: function(x, y, r) {
			ctx.beginPath();
			ctx.arc(x+X, y+Y, 0, 2*Math.PI);
			ctx.stroke();
			ctx.fill();
			return this;
		},
		strokeText: function(text, x, y, maxWidth) {
			ctx.strokeText(text, x+X, y+Y, maxWidth);
			return this;
		},
		fillText: function(text, x, y, maxWidth) {
			ctx.fillText(text, x+X, y+Y, maxWidth);
			return this;
		},
		fullText: function(text, x, y, maxWidth) {
			ctx.strokeText(text, x+X, y+Y, maxWidth);
			ctx.fillText(text, x+X, y+Y, maxWidth);
			return this;
		},
		measureText: function(text) {
			return ctx.measureText(text);
		},

		//Images
		drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
			ctx.drawImage(image, sx+X, sy+Y, sw, sh, dx?dx+X:undefined, dy?dy+Y:undefined, dw, dh);
			return this;
		},
		createImageData: function(w, h) {
			ctx.createImageData(w, h);
			return this;
		},
		getImageData: function(x, y, w, h) {
			ctx.getImageData(x+X, y+Y, w, h);
			return this;
		},
		putImageData: function(imageData, x, y, sx, sy, sw, sh) {
			ctx.putImageData(imageData, x+X, y+Y, sx?sx+X:undefined, sy?sy+Y:undefined, sw, sh);
			return this;
		},

		//Gradients / Patterns
		createLinearGradient: function(x1, y1, x2, y2) {
			return ctx.createLinearGradient(x1, y1, x2, y2);
		},
		createRadialGradient: function(x1, y1, r1, x2, y2, r2) {
			return ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
		},
		createPattern: function(elem, type) {
			return ctx.createPattern(elem, type);
		},
		setLineDash: function(sequence) {
			ctx.setLineDash(sequence);
			return this;
		},
		getLineDash: function() {
			return ctx.getLineDash();
		},

		//Collisions
		isPointInPath: function(x, y) {
			return ctx.isPointInPath(x+X, y+Y);
		},
		isPointInStroke: function(x, y) {
			return ctx.isPointInStroke(x+X, y+Y);
		},

		//Some other functions
		getAsset: function(id) {
			return draw.loader.get(id);
		},
		getWidth: function() {
			return width;
		},
		getHeight: function() {
			return height;
		},
		getCanvasWidth: function() {
			return domElement.innerWidth;
		},
		getCanvasHeight: function() {
			return domElement.innerHeight;
		}
	}


	return this;
}

Draw.prototype.name = "draw-canvas";
Draw.prototype.type = "Draw";

Draw.prototype.Init = function(game) {
	var self = this;
	game.on("init", function() {
		self.loader = game.Assets;
	});
}