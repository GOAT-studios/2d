(function() {



var Sprite = function(spriteSheet, pos, dim) {
	this.sheet = spriteSheet;
	this.position = pos;
	this.dimensions = dim;
	
	return this;
}

Sprite.Name  = "sprites-basic";
Sprite.Type  = "Sprite";
Sprite.__noConstructor = true;



Game.plugins.push(Sprite);



})();