(function() {



var Animation = function(name, frames, speed) {
    this.name = name;
    this.speed = speed;
    this.frames = [];
    this.pauseDuration = 0;
    this.paused = false;

    for(var i = 0, len = frames.length; i < len; i++) {
        if(frames[i].sheet && frames[i].position && frames[i].dimensions) {
            this.frames.push(frames[i]);
        }
        else {
            this.frames.push(this.game.Sprite(frames[i]));
        }
    }

    this.initTime = Game.prototype.Utils.time();

    return this;
}

Animation.name = "Frames";

Animation.Init = function(game) {
    this.prototype.game = game;
}

Animation.prototype.update = function() {
    if(!this.paused) {
        var currTime = Game.prototype.Utils.time();
        this.current = Math.round(((currTime - this.startTime - this.pauseDuration) / this.speed) % this.frames.length);
    }

    return this;
}

Animation.prototype.start = function() {
    this.startTime = Game.prototype.Utils.time();
    if(this.paused && this.pauseTime) this.pauseDuration += this.startTime - this.pauseTime;
    this.paused = false;

    return this;
}

Animation.prototype.pause = function() {
    this.pauseTime = Game.prototype.Utils.time();
    this.paused = true;
    return this;
}

Animation.prototype.stop = function() {
    this.paused = true;
    this.pauseTime = undefined;
    this.pauseDuration = 0;

    return this;
}

Animation.prototype.getCurrent = function() {
    return this.animations[this.current];
}



Game.animations.push(Animation);



})();