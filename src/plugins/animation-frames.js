(function() {



var construct = function(game) {

    var Animation = function(name, frames, speed) {
        this.name = name;
        this.speed = speed;
        this.frames = [];
        this.pauseDuration = 0;
        this.paused = true;

        for(var i = 0, len = frames.length; i < len; i++) {
            if(frames[i].sheet && frames[i].position && frames[i].dimensions) {
                this.frames.push(frames[i]);
            }
            else {
                this.frames.push(game.Sprite(frames[i]));
            }
        }

        this.initTime = Game.prototype.Utils.time();
        this.start();

        return this;
    }

    Animation.prototype.update = function() {
        if(!this.paused) {
            var currTime = Game.prototype.Utils.time();
            this.current = Math.floor(((currTime - this.startTime - this.pauseDuration) / this.speed) % this.frames.length);
        }

        return this;
    }

    Animation.prototype.start = function() {
        if(this.paused) {
            this.startTime = Game.prototype.Utils.time();
            if(this.pauseTime) this.pauseDuration += this.startTime - this.pauseTime;
            this.paused = false;
        }

        return this;
    }

    Animation.prototype.pause = function() {
        if(!this.paused) {
            this.pauseTime = Game.prototype.Utils.time();
            this.paused = true;
        }
        return this;
    }

    Animation.prototype.stop = function() {
        this.paused = true;
        this.pauseTime = undefined;
        this.pauseDuration = 0;

        return this;
    }

    Animation.prototype.getCurrent = function() {
        return this.frames[this.current];
    }



    return Animation;
}



var Plugin = {
    name: "animation-frames",
    id: "core.animation-frames",
    path: "Animations.Frames",
    construct: construct
}
Game.plugins.push(Plugin);



})();