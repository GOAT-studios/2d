(function() {



var Plugin = function() {
	return AnimationCollection;
}

var AnimationCollection = function(animations, current) {
	if(animations instanceof Array) {
		var obj = {};
		for(var i = 0, len = animations.length; i < len; i++) {
			obj[animations[i].name] = animations[i];
		}
		this.animations = obj;
	}
	else {
		this.animations = animations;
	}

	this.current = current || Object.keys(this.animations)[0];

	return this;
}

AnimationCollection.prototype.name = "animation-collection-basic";
AnimationCollection.prototype.type = "AnimationCollection";

AnimationCollection.prototype.add = function(animation) {
	this.animations[animation.name] = animation;

	return this;
}

AnimationCollection.prototype.remove = function(name) {
	delete this.animations[name];

	return this;
}

AnimationCollection.prototype.play = function(name) {
	this.animations[this.current].stop();
	this.animations[name].start();
	this.current = name;

	return this;
}

AnimationCollection.prototype.getCurrent = function() {
	return this.animations[this.current];
}



})();