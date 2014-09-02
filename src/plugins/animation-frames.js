(function() {



var construct = function(game) {

    var Animation = function(name, frames, speed) {
        this.name = name;
        this.speed = speed;
        this.frames = frames;
        this.pauseDuration = 0;
        this.playing = false;

        this.initTime = game.Utils.time();
        this.start();

        return this;
    }

    Animation.prototype.update = function() {
        if(this.playing) {
            var currTime = game.Utils.time();
            this.current = Math.floor(((currTime - this.startTime - this.pauseDuration) / this.speed) % this.frames.length);
        }

        return this;
    }

    Animation.prototype.start = function() {
        if(!this.playing) {
            this.startTime = game.Utils.time();
            if(this.pauseTime) this.pauseDuration += this.startTime - this.pauseTime;
            this.playing = true;
        }

        return this;
    }

    Animation.prototype.pause = function() {
        if(this.playing) {
            this.pauseTime = game.Utils.time();
            this.playing = false;
        }
        return this;
    }

    Animation.prototype.stop = function() {
        this.playing = false;
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