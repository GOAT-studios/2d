(function() {



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

AnimationCollection.prototype.add = function(animation, name) {
	this.animations[name || animation.name] = animation;

	return this;
}

AnimationCollection.prototype.remove = function(name) {
	delete this.animations[name];

	return this;
}

AnimationCollection.prototype.play = function(name) {
	this.getCurrent().stop();
	this.get(name).start();
	this.current = name;

	return this;
}

AnimationCollection.prototype.pause = function() {
	this.getCurrent().pause();

	return this;
}

AnimationCollection.prototype.stop = function() {
	this.getCurrent().stop();

	return this;
}

AnimationCollection.prototype.get = function(name) {
	return this.animations[name];
}

AnimationCollection.prototype.getCurrent = function() {
	return this.get(this.current);
}




var Plugin = {
	name: "animation-collection",
	id: "core.animation-collection",
	path: "Animations.Collection",
	content: AnimationCollection
}
Game.plugins.push(Plugin);



})();