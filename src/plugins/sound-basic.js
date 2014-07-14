var Sound;

(function() {



Sound = function() {
    this.sounds = [];

    return this;
}

Sound.prototype.name = "sound-dom";
Sound.prototype.type = "Sound";

Sound.prototype.Init = function(game) {
    var self = this;
    game.on("init", function() {
        self.loader = game.Assets;
    });
}

Sound.prototype.load = function(urls, name) {
    var asset = this.loader.load(urls, name).get();
    var sound = this.createSound(asset);
    this.sounds.push(sound);

    return this;
}

Sound.prototype.get = function(id) {
    return this.loader.get(id);
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
        if(this.element) {
            this.element.load();
            this.element.play();
        }
        else {
            console.warn("WARN: Asset.play(): No element! Are you sure this Asset loaded successfully?");
        }
        return this;
    }

    asset.pause = function() {
        if(this.element) {
            this.element.pause();
        }
        else {
            console.warn("WARN: Asset.play(): No element! Are you sure this Asset loaded successfully?");
        }
        return this;
    }

    asset.stop = function() {
        if(this.element) {
            this.element.pause();
            this.element.currentTime = 0;
        }
        else {
            console.warn("WARN: Asset.play(): No element! Are you sure this Asset loaded successfully?");
        }
        return this;
    }


    return asset;
}

Sound.prototype.createSound = createSound;



})()