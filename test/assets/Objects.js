var Objects;

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
	this.behaviour = new game.Behaviours.TwoPoint(point1, point2, speed);
	this.animationCollection = new game.AnimationCollection([
		new game.Animation("animation", [
			new Sprite(game.Assets.get("texture.png"), {x:0,y:0}, {w:72,h:72})
		], 16)
	]);
}

TestPlatform.prototype.Update = function() {
	this.behaviour.update(this);
	this.animationCollection.getCurrent().update();
}

TestPlatform.prototype.Draw = function(d) {
	d.drawSprite(this.animationCollection.getCurrent().currentFrame);
}



Objects.TestObject = TestObject;
Objects.TestPlatform = TestPlatform;



})();