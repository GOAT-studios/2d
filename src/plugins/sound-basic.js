var Sound;

(function() {



Sound = function() {
    this.sounds = [];

    return this;
}

Sound.prototype.name = "sound-dom";
Sound.prototype.type = "Sound";

Sound.prototype.Init = function(game) {
    this.game = game;
}

Sound.prototype.load = function(urls, name) {
    var asset = this.game.Assets.load(urls, name).get();
    var sound = this.createSound(asset);
    this.sounds.push(sound);

    return this;
}

Sound.prototype.get = function(id) {
    this.game.Assets.get(id);

    return this;
}

Sound.prototype.play = function(id) {
    var sound = this.get(id);
    if(sound) sound.play();

    return this;
}

Sound.prototype.pause = function(id) {
    var sound = this.get(id);
    if(sound) sound.pause();

    return this;
}

Sound.prototype.stop = function(id) {
    var sound = this.get(id);
    if(sound) sound.stop();

    return this;
}







/*
 * SoundInstance
 *
 * SoundInstance respresents a sound, with some additional information and methods.
 * It looks like an Asset, but it includes play, pause and stop function.
 */

var createSound = function(asset) {
    if(!asset.element && asset.blobURL) {
        asset.element = document.createElement("audio");
        asset.element.setAttribute("src", asset.blobURL);
    }


    asset.play = function() {
        this.element.load();
        this.element.play();
        return this;
    }

    asset.pause = function() {
        this.element.pause();
        return this;
    }

    asset.stop = function() {
        this.element.pause();
        this.element.currentTime = 0;
        return this;
    }


    return this;
}



})()