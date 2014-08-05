(function() {



var Sprite = function(spriteSheet, pos, dim) {
	this.sheet = spriteSheet;
	this.position = pos;
	this.dimensions = dim;
	
	return this;
}

Sprite.prototype.Name = "sprites-basic";
Sprite.prototype.Type = "Sprites";
Sprite.__noConstructor = true;



Game.plugins.push(Sprite);



})();