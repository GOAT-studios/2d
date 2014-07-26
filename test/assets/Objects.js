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



Objects.TestObject



})();