var Sound;

(function() {



Sound = function() {
    return this;
}

Sound.prototype.name = "sound-dom";
Sound.prototype.type = "Sound";

Sound.prototype.Init = function(game) {
    this.game = game;
}

Sound.prototype.load = function(urls, name) {
    this.game.Assets.load(urls, name);

    return this;
}

Sound.prototype.get = function(id) {
    this.game.Assets.get(id);

    return this;
}

Sound.prototype.play = function(id) {
    var sound = this.get(id);
    if(sound && sound.element && sound.element.play) sound.element.play();

    return this;
}

Sound.prototype.pause = function(id) {
    var sound = this.get(id);
    if(sound && sound.element && sound.element.pause) sound.element.pause();

    return this;
}

Sound.prototype.stop = function(id) {
    var sound = this.get(id);
    if(sound && sound.element && sound.element.pause) {
        sound.element.pause();
        sound.element.currentTime = 0;
    }

    return this;
}



})()