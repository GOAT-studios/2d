Game.animations = [];



(function() {



var Animations = function() {
    return this;
}

Animations.prototype.name = "animations-basic";
Animations.prototype.type = "Animations";

Animations.prototype.Init = function(game) {
    this.game = game;

    for(var i = 0, len = Game.animations.length; i < len; i++) {
        this.add(Game.animations[i]);
    }

    var arr = Object.keys(this);
    for(var i = 0, len = arr.length; i < len; i++) {
        if(arr[i].Init) {
            arr[i].Init(game);
        }
    }

    return this;
}

Animations.prototype.add = function(animation) {
    var name = animation.name = Game.prototype.Utils.capitalize(animation.name);
    this[name] = animation;

    if(this.game && animation.Init) {
        animation.Init(this.game);
    }

    return this;
}

Animations.prototype.remove = function(name) {
    delete this[name];

    return this;
}



Game.plugins.push(Animations);



})();