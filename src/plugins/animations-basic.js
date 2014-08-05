Game.animations = [];



(function() {



var Animations = function(game) {
    this.game = game;
    
    return this;
}

Animations.prototype.Name = "animations-basic";
Animations.prototype.Type = "Animations";

Animations.prototype.Init = function(game) {
    this.game = game;

    for(var i = 0, len = Game.animations.length; i < len; i++) {
        var animation = Game.animations[i];
        if(!animation.__noConstructor) {
            var animation = new animation(this.game);
        }
        this.add(animation);
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
    var name = animation.Name = Game.prototype.Utils.capitalize(animation.Name);
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