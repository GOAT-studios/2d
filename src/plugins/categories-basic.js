Game.categories = [];



(function() {



var Categories = function(game) {
    //Save Game for later
    this.game = game;

    return this;
}

Categories.prototype.name = "categories-basic";
Categories.prototype.type = "Categories";

Categories.prototype.Init = function(game) {
	for(var i = 0, len = Game.categories.length; i < len; i++) {
		this.add(Game.categories[i]);
	}

	return this;
}

Categories.prototype.add = function(category) {
    var name = category.name = this.game.Utils.capitalize(category.name);

    this[name] = category;
    if(this.game.initTime && category.Init) {
        category.Init(this.game);
    }

    return this;
}

Categories.prototype.remove = function(name) {
    var name = this.game.Utils.capitalize(name);

    this[name] = undefined;

    return this;
}

Categories.prototype.get = function(name) {
    var name = this.game.Utils.capitalize(name);

    return this[name] || null;
}

Categories.prototype.loop = function(cb) {
    for(name in this) {
        if(!/^(add|remove|get|loop|Init)$/.test(name)) {
            cb(this[name], name);
        }
    }
}



Game.plugins.push(Categories);



})();