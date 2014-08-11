(function() {



var Draw = function(game, options) {
    var D = this;
    this.game = game;

//Configuration
    if(!options) var options = {};
    if(!options.defaultConfig) options.defaultConfig = {};

    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width  = options.width  || 35;
    this.height = options.height || 35;

    var domElement = this.domElement = document.createElement("canvas");
    var ctx = this.context = domElement.getContext("2d");
    var canvasWidth  = this.canvasWidth  = 0;
    var canvasHeight = this.canvasHeight = 0;

    //Anti-aliasing
    ctx.translate(0.5, 0.5);



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
            ctx.clearRect(x+D.x, y+D.y, w, h);
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
            ctx.moveTo(x+D.x, y+D.y);
            return this;
        },
        lineTo: function(x, y) {
            ctx.lineTo(x+D.x, y+D.y);
            return this;
        },
        rect: function(x, y, w, h) {
            ctx.rect(x+D.x, y+D.y, w, h);
            return this;
        },
        arc: function(x, y, r, sa, ea, cc) {
            ctx.arc(x+D.x, y+D.y, r, sa, ea, cc);
            return this;
        },
        arcTo: function(x1, y1, x2, y2, r) {
            ctx.arcTo(x1+D.x, y1+D.y, x2+D.x, y2+D.y, r);
            return this;
        },
        quadraticCurveTo: function(cpx, cpy, x, y) {
            ctx.quadraticCurveTo(cpx+D.x, cpy+D.y, x+D.x, y+D.y);
            return this;
        },
        bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
            ctx.bezierCurveTo(cp1x+D.x, cp1y+D.y, cp2x+D.x, cp2y+D.y, x+D.x, y+D.y);
            return this;
        },

        //Basic shapes
        strokeRect: function(x, y, w, h) {
            ctx.strokeRect(x+D.x, y+D.y, w, h);
            return this;
        },
        fillRect: function(x, y, w, h) {
            ctx.fillRect(x+D.x, y+D.y, w, h);
            return this;
        },
        fullRect: function(x, y, w, h) {
            ctx.strokeRect(x+D.x, y+D.y, w, h);
            ctx.fillRect(x+D.x, y+D.y, w, h);
            return this;
        },
        strokeCircle: function(x, y, r) {
            ctx.beginPath();
            ctx.arc(x+D.x, y+D.y, 0, 2*Math.PI);
            ctx.stroke();
            return this;
        },
        fillCircle: function(x, y, r) {
            ctx.beginPath();
            ctx.arc(x+D.x, y+D.y, 0, 2*Math.PI);
            ctx.fill();
            return this;
        },
        fullCircle: function(x, y, r) {
            ctx.beginPath();
            ctx.arc(x+D.x, y+D.y, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fill();
            return this;
        },
        strokeText: function(text, x, y, maxWidth) {
            ctx.strokeText(text, x+D.x, y+D.y, maxWidth);
            return this;
        },
        fillText: function(text, x, y, maxWidth) {
            ctx.fillText(text, x+D.x, y+D.y, maxWidth);
            return this;
        },
        fullText: function(text, x, y, maxWidth) {
            ctx.strokeText(text, x+D.x, y+D.y, maxWidth);
            ctx.fillText(text, x+D.x, y+D.y, maxWidth);
            return this;
        },
        measureText: function(text) {
            return ctx.measureText(text);
        },

        //Images
        drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
            ctx.drawImage(image, sx+D.x, sy+D.y, sw, sh, dx?dx+D.x:undefined, dy?dy+D.y:undefined, dw, dh);
            return this;
        },
        drawSprite: function(sprite) {
            this.drawImage(sprite.sheet, sprite.position.x, sprite.position.y, sprite.dimensions.w, sprite.dimensions.h, 0, 0, sprite.dimensions.w, sprite.dimensions.h);
        },
        createImageData: function(w, h) {
            ctx.createImageData(w, h);
            return this;
        },
        getImageData: function(x, y, w, h) {
            ctx.getImageData(x+D.x, y+D.y, w, h);
            return this;
        },
        putImageData: function(imageData, x, y, sx, sy, sw, sh) {
            ctx.putImageData(imageData, x+D.x, y+D.y, sx?sx+D.x:undefined, sy?sy+D.y:undefined, sw, sh);
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
            return ctx.isPointInPath(x+D.x, y+D.y);
        },
        isPointInStroke: function(x, y) {
            return ctx.isPointInStroke(x+D.x, y+D.y);
        },

        //Some other functions
        getAsset: function(id) {
            return D.loader.get(id);
        },
        getWidth: function() {
            return D.width;
        },
        getHeight: function() {
            return D.height;
        },
        getCanvasWidth: function() {
            return canvasWidth;
        },
        getCanvasHeight: function() {
            return canvasHeight;
        }
    }


    return this;
}

Draw.prototype.Update = function(game) {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
}

Draw.prototype.setLoader = function(loader) {
    this.loader = loader;

    return this;
}

Draw.prototype.updateSize = function() {
    this.canvasWidth  = this.domElement.offsetWidth;
    this.canvasHeight = this.domElement.offsetHeight;

    return this;
}



var Plugin = {
    name: "draw-canvas",
    id: "core.draw-canvas",
    path: "Draw",
    construct: function(game) {
        return new Draw(game);
    }
}
Game.plugins.push(Plugin);



})();