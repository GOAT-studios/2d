Game.behaviours = [];



(function() {



var Behaviours = function(game) {
    this.game = game;

    return this;
}

Behaviours.prototype.Name = "behaviours-basic";
Behaviours.prototype.Type = "Behaviours";

Behaviours.prototype.Init = function(game) {
    this.game = game;
    
    for(var i = 0, len = Game.behaviours.length; i < len; i++) {
        var behaviour = Game.behaviours[i];
        if(!behaviour.__noConstructor) {
            var behaviour = new behaviour(this.game);
        }
        this.add(behaviour);
    }

    var arr = Object.keys(this);
    for(var i = 0, len = arr.length; i < len; i++) {
        if(arr[i].Init) {
            arr[i].Init(game);
        }
    }

    this.hadInit = true;

    return this;
}

Behaviours.prototype.add = function(behaviour) {
    var name = behaviour.name = this.game.Utils.capitalize(behaviour.Name);
    this[name] = behaviour;

    if(this.hadInit && behaviour.Init) {
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