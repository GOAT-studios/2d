(function() {



var Behaviours = function() {
    return this;
}

Behaviours.prototype.name = "behaviours-basic";
Behaviours.prototype.type = "behaviours";

Behaviours.prototype.Init = function(game) {
    this.game = game;

    for(var i = 0, len = Game.behaviours.length; i < len; i++) {
        this.register(Game.behaviours[i]);
    }

    var arr = Object.keys(this);
    for(var i = 0, len = arr.length; i < len; i++) {
        if(arr[i].Init) {
            arr[i].Init(game);
        }
    }

    return this;
}

Behaviours.prototype.register = function(behaviour) {
    var name = behaviour.name = Game.prototype.Utils.capitalize(behaviour.name);
    this[name] = behaviour;

    if(this.game && behaviour.Init) {
        behaviour.Init(this.game);
    }

    return this;
}

Behaviours.prototype.remove = function(name) {
    delete this[name];

    return this;
}



Game.plugins.push(Behaviours);



})();