(function() {



var Sprite = function(sheet, pos, dim) {
	this.sheet = sheet;
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