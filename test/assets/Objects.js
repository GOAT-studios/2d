var Objects = {};

(function(){



var TestObject = function(position, dimensions) {
	this.position = position;
	this.dimensions = dimensions;

	return this;
}

TestObject.prototype.Draw = function(d) {
	d.fillStyle("#CC0000").fillRect(0, 0, this.dimensions.x, this.dimensions.y);
}


var TestPlatform = function(position, dimensions, point1, point2, speed) {
	this.position = position;
	this.dimensions = dimensions;
	this.points = [point1, point2];
	this.speed = speed;

	return this;
}

TestPlatform.prototype.Init = function(game) {
	this.behaviour = new game.Behaviours.TwoPoints(this.points[0], this.points[1], this.speed);
	this.animations = new game.Animations.Collection([
		new game.Animations.Frames("animation", [
			new game.Sprite(game.Assets.get("background1").element, {x:0,y:0}, {w:72,h:72}),
			new game.Sprite(game.Assets.get("background1").element, {x:0,y:0}, {w:72,h:72})
		], 16)
	]);

	return this;
}

TestPlatform.prototype.Update = function() {
	this.behaviour.update(this);
	this.animations.getCurrent().update();
}

TestPlatform.prototype.Draw = function(d) {
	d.drawSprite(this.animations.getCurrent().getCurrent());
}



Objects.TestObject = TestObject;
Objects.TestPlatform = TestPlatform;



})();