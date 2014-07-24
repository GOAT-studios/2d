(function() {



var Sprite = function(spriteSheet, pos, dim) {
	this.sheet = spriteSheet;
	this.position = pos;
	this.dimensions = dim;
	
	return this;
}

Sprite.prototype.name = "sprites-basic";
Sprite.prototype.type = "Sprites";



Game.plugins.push(Sprite);



})();