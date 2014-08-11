(function() {



var Sprite = function(spriteSheet, pos, dim) {
	this.sheet = spriteSheet;
	this.position = pos;
	this.dimensions = dim;
	
	return this;
}



var Plugin = {
	name: "sprites-basic",
	id: "core.sprites-basic",
	path: "Sprite",
	content: Sprite
}
Game.plugins.push(Plugin);



})();