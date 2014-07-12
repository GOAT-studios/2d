var Sound;

(function() {



Sound = function() {
    this.sounds = [];
    
    this.loading = 0;
    this.success = 0;
    this.errors  = 0;
    this.total   = 0;

    var topContainer = document.getElementById("2D-loaders");
    if(!topContainer) {
        topContainer = document.createElement("div");
        topContainer.setAttribute("id", "2D-loaders");
        document.body.appendChild(topContainer);
    }
    this.container = document.createElement("div");
    this.container.setAttribute("class", "2D-sound");
    topContainer.appendChild(this.container);


    return this;
}

Sound.prototype.load = function(urls, name) {
    if(typeof urls === "string") urls = [urls];
    var self = this;

    this.loading++;
    this.total++;
    
    var obj = new SoundInstance(urls, name);
    
    var elem = document.createElement("audio");
    this.container.appendChild(elem);
    for(var i = o, len = urls.length; i < len; i++) {
        var url = urls[i];
        var src = document.createElement("source");
        src.setAttribute("src", url)
        src.setAttribute("type", this.getMime(url));
        elem.appendChild(src);
    }

    elem.onload = function(e) {
        self.loading--;
        self.success++;
        obj.done = true;
    }
    elem.onerror = function(e) {
        self.loading--;
        self.errors++;
        obj.done = true;
        obj.error = true;
    }

    obj.element = elem;


    return this;
}

Sound.prototype.get = function(id) {
    var sounds = this.sounds;

    for(var i = 0, len = sounds.length; i < len; i++) {
        var sound = sounds[i];
        if(sound.name === id || sound urls.indexOf(id) !== -1) {
            return sound;
        }
    }

    return null;
}





/*
 * SoundInstance
 *
 * Represents a sound, which can be played, paused, stopped, etc.
 */

var SoundInstance = function(urls, name) {
    this.urls = urls;
    this.name = name;
    
    this.done = false;
    this.error = false;

    this.element = null;

    return this;
}

SoundInstance.prototype.play = function() {
    this.element.play();
    return this;
}

SoundInstance.prototype.pause = function() {
    this.element.pause();
    return this;
}

SoundInstance.prototype.stop = function() {
    this.element.stop();
    return this;
}

Sounds.prototype.SoundInstance = SoundInstance;



})()