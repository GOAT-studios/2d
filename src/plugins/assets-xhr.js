var Assets;

(function() {



Assets = function() {
	this.assets = [];

	this.loading = 0;
	this.loaded = 0;
	this.errors = 0;
	this.total = 0;

	return this;
}

Assets.prototype.load = function(url, name) {
	var elem = this.getElement(url);
	this.setEvents(elem);
	this.loading++;
	this.total++;

	this.assets.push({
		name: name,
		url: url,
		element: elem
	});

	return this;
}

Assets.prototype.get = function(id) {
	var assets = this.assets;
	for(var i = 0, len = assets.length; i < len; i++) {
		var asset = assets[i];
		if(asset.name === id || asset.url === id) {
			return asset.element;
		}
	}

	return null;
}

Assets.prototype.getElement = function(url) {
	var ext = this.getExtension(url);
	var elem;

	switch(ext) {
		case "jpg","jpeg","png","gif":
			elem = document.createElement("img");
			elem.setAttribute("src", url);
			elem.setAttribute("type", this.mimes[ext]);
			break;
		case "mp3","wav","ogg":
			elem = document.createElement("audio");
			var source = document.createElement("source");
			source.setAttribute("src", url);
			source.setAttribute("type", this.mimes[ext]);
			elem.appendChild(source);
			break;
		case "mp4","m4v","webm":
			elem = document.createElement("video");
			var source = document.createElement("source");
			source.setAttribute("src", url);
			source.setAttribute("type", this.mimes[ext]);
			elem.appendChild(source);
			break;
		default:
			elem = document.createElement("script");
			elem.setAttribute("src", "url");
			elem.setAttribute("type", this.mimes[ext]);
	}

	return elem;
}

Assets.prototype.getExtension = function(url) {
	var split = url.split(".");
	return split[split.length - 1].substr(1).toLowerCase();
}

Assets.prototype.setEvents = function(elem) {
	var assets = this;
	elem.onload = function(e) {
		assets.loaded++;
		assets.loading--;

		assets.emitProgress();
		assets.emit("load", e);
		if(assets.loading === 0) assets.emit("done");
	}
	elem.onerror = function(e) {
		assets.errors++;
		assets.loading--;

		assets.emitProgress();
		assets.emit("error", e);
		if(assets.loading === 0) asset.emit("done");
	}

	return this;
}



})