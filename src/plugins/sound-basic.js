(function() {



var Sound = function(game) {
    this.sounds = [];
    game.EventEmitter(this);

    return this;
}

Sound.prototype.load = function(urls, name) {
    var asset = this.loader.load(urls, name).get();
    var sound = this.createSound(asset);
    this.sounds.push(sound);

    this.emit("soundadd", [sound]);

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

Sound.prototype.setLoader = function(loader) {
    this.loader = loader;

    return this;
}







/*
 * SoundInstance
 *
 * SoundInstance respresents a sound, with some additional information and methods.
 * It looks like an Asset, but it includes play, pause and stop function.
 */

var createSound = function(asset) {
    asset.on("success", function() {
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

    });


    return asset;
}

Sound.prototype.createSound = createSound;




var Plugin = {
    name: "sound-basic",
    id: "core.sound-basic",
    path: "Sound",
    construct: function(game) {
        return new Sound(game);
    }
}
Game.plugins.push(Plugin);



})()