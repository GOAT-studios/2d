var Assets;

(function() {



Assets = function() {
    this.assets = [];

    this.loading = 0;
    this.success = 0;
    this.errors  = 0;
    this.total   = 0;

    this.loadedSize = 0;
    this.errorSize  = 0;
    this.totalSize  = 0;

    return this;
}

Assets.prototype.name = "assets-xhr";
Assets.prototype.type = "Assets";

Assets.prototype.load = function(url, name, forceText) {
    if(typeof name === "boolean") {forceText = name; name = undefined;}
    var assets = this;

//Update stats
    assets.loading++;
    assets.total++;

//Create an Assets object
    var obj = new Asset(url, name);

// Create an XHR request
    var xhr = obj.xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    if(!forceText) {
        xhr.responseType = "arraybuffer";
    }

    xhr.onreadystatechange = function(e) {
        //Get some info from headers
        if(xhr.readyState === 2) {
            obj.totalSize = xhr.getResponseHeader("Content-Length");
            obj.mime = xhr.getResponseHeader("Content-Type");
        }

        //Asset loaded/errored
        if(xhr.readyState === 4) {
            assets.loading--;
            if(xhr.status === 200) {
                assets.success++;
                obj.done  = true;
                obj.error = false;

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
            }
            else {
                assets.errors++;
                obj.done  = true;
                obj.error = true;
                obj.data  = null;

                obj.loadedSize = 0;
                obj.totalSize  = 0;
            }
        }
    }

    //Catch Progress event
    xhr.onprogress = function(e) {
        if(xhr.status === 200) {
            obj.loadedSize = e.loaded;
            obj.totalSize  = e.total || e.totalSize;

            assets.updateProgress();
        }
    }

    xhr.send();

// Push the objects to the assets list
    this.assets.push(obj);

    return this;
}

Assets.prototype.get = function(id) {
    var assets = this.assets;

    if(id) {
        for(var i = 0, len = assets.length; i < len; i++) {
            var asset = assets[i];
            if(asset.name === id || asset.url === id) {
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





var Asset = function(url, name) {
    this.name = name || null;
    this.url = url || null;
    this.mime = null;
    this.done = false; // Whether the XHR has finished loading (errors included)
    this.error = null; // Whether the XHR has errored
    this.loadedSize = 0;
    this.totalSize = 0;
    this.xhr = null;
    this.data = null;
    this.blobURL = null;

    return this;
}



})()