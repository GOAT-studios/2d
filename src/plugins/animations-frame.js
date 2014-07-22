var Animations;

(function() {



Animations = function() {
	return this;
}

Animations.prototype.name = "animations-frame";
Animations.prototype.type = "Animation";

Animations.prototype.Init = function(game) {
	this.game = game;
}




/*
 * Animation
 *
 * Represents an animation (frame by frame)
 */

var Animation = function(name, frames, speed) {
	this.name = name;
	this.speed = speed;
	this.frames = [];
	this.pauseDuration = 0;

	for(var i = 0, len = frames.length; i < len; i++) {
		if(frames[i].sheet && frames[i].position && frames[i].dimensions) {
			this.frames.push(frames[i]);
		}
		else {
			this.frames.push(Animation.game.Sprite(frames[i]));
		}
	}

	this.startTime = Game.prototype.Utils.time();

	return this;
}

Animation.prototype.update = function() {
	var currTime = Game.prototype.Utils.time();
	var index = Math.round((currTime - this.startTime - this.pauseDuration) % this.speed);
	this.currentFrame = this.frames[index];

	return this;
}

Animation.prototype.pause = function() {
	this.pauseTime = Game.prototype.Utils.time();
	return this;
}

Animation.prototype.start = function() {
	this.lastStartTime = Game.prototype.Utils.time();
	if(this.pauseTime) this.pauseDuration += this.lastStartTime - this.pauseTime;

	return this;
}

Animations.prototype.Animation = Animation;



})();