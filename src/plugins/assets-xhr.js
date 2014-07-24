(function() {



var Assets = function() {
    this.assets = [];

    this.loading = 0;
    this.success = 0;
    this.errors  = 0;
    this.total   = 0;

    this.loadedSize = 0;
    this.errorSize  = 0;
    this.totalSize  = 0;

    Game.prototype.EventEmitter(this);

    return this;
}

Assets.prototype.name = "assets-xhr";
Assets.prototype.type = "Assets";

Assets.prototype.Init = function(game) {
    game.EventEmitter(this);
}

Assets.prototype.load = function(urls, name, forceText) {
    if(typeof urls === "string") urls = [urls];
    if(typeof name === "boolean") {forceText = name; name = undefined;}
    var assets = this;

//Update stats
    assets.loading++;
    assets.total++;

//Create an Assets object
    var obj = new Asset(urls, name);

// Load asset
    loadXHR(urls, 0, !forceText, function(type, xhr) {
        if(type === "progress") {
            //xhr is now the ProgressEvent
            obj.loadedSize = xhr.loaded;
            obj.totalSize  = xhr.total || xhr.totalSize;
            assets.updateProgress();
            obj.emit("progress", [xhr, assets]);
            assets.emit("progress", [xhr, obj]);
        }
        else if(type === "error") {
            assets.loading--;
            assets.errors++;
            obj.done  = true;
            obj.error = true;
            obj.data  = null;
            obj.loadedSize = 0;
            obj.totalSize  = 0;
            obj.emit("error", [xhr]);
            assets.emit("asseterror", [xhr, obj]);

        }
        else if(type === "done") {
            assets.loading--;
            assets.success++;
            obj.done  = true;
            obj.error = false;
            obj.xhr = xhr;

            if(forceText) {
                obj.data = xhr.responseText || xhr.response;
            }
            else {
                obj.data  = xhr.response;
                //Generate objectURL
                var arrBuffView = new Uint8Array(obj.data);
                var blob = new Blob([arrBuffView], {type: obj.mime});
                var url = (window.URL || window.webkitURL).createObjectURL(blob);
                obj.blobURL = url;
            }

            obj.emit("done", [xhr]);
            assets.emit("assetdone", [xhr, obj]);

            if(assets.total === (assets.success + assets.errors)) {
                assets.emit("done");
            }
        }
        else {
            console.warn("WARN: Unknown event.");
        }
    });

// Push the objects to the assets list
    this.assets.push(obj);

    this.emit("assetadd", [obj]);


    return this;
}

Assets.prototype.get = function(id) {
    var assets = this.assets;

    if(id) {
        for(var i = 0, len = assets.length; i < len; i++) {
            var asset = assets[i];
            if(asset.name === id || asset.urls.indexOf(id) !== -1) {
                return asset;
            }
        }
    }
    else {
        // No ID: return last added asset
        return assets[assets.length - 1];
    }

    return null;
}

Assets.prototype.updateProgress = function() {
//Private
//Update sizes (called on each progress event)
    this.totalSize  = 0;
    this.loadedSize = 0;
    this.errorSize  = 0;

    for(var i = 0, len = this.assets.length; i < len; i++) {
        var asset = this.assets[i];
        this.totalSize += asset.totalSize || 0;
        if(asset.error) {
            this.errorSize += asset.totalSize || 0;
        }
        else {
            this.loadedSize += asset.loadedSize || 0;
        }
    }
}







/*
 * Asset
 *
 * Represents a file.
 */

var Asset = function(urls, name) {
    if(name) this.name = name;
    this.urls = urls;

    this.done = false;
    this.error = null;

    this.loadedSize = 0;
    this.totalSize = 0;

    this.xhr = null;

    Game.prototype.EventEmitter(this);

    return this;
}






/*
 * VARS
 *
 * Some useful variables.
 */

var loadXHR = function(urls, index, loadAsArrayBuffer, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", urls[index], true);

    if(loadAsArrayBuffer) xhr.responseType = "arraybuffer";

    xhr.onreadystatechange = function() {
        if(!xhr.old) {
            if(xhr.readyState >= 2 && xhr.status !== 200) {
                xhr.old = true;
                xhr.abort();
                if(urls[index + 1]) {
                    loadXHR(urls, index+1, loadAsArrayBuffer, cb);
                }
                else {
                    cb("error", xhr);
                }
            }
            else if(xhr.readyState === 4) {
                xhr.old = true;
                if(xhr.status === 200) {
                    cb("done", xhr);
                }
                else {
                    cb("error", xhr);
                }
            }
        }
    }

    xhr.onprogress = function(e) {
        if(!xhr.old) {
            cb("progress", e);
        }
    }

    xhr.send();
}



Game.plugins.push(Assets);



})()