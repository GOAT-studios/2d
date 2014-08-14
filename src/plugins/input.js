(function() {



var Input = function(game) {
    var self = this;
    this.keys = {};
    
    game.on("init", function(game) {
        game.domElement.addEventListener("keydown", self.HandlerDown);
        game.domElement.addEventListener("keyup", self.HandlerUp);
    });
    return this;
}

Input.prototype.Map = function(options){
    Game.prototype.Utils.merge(this.keys, options);

    return this;
}

Input.prototype.HandlerUp = function(event){
    this[this.keys[event.keyCode]] = false;

    return this;
}
Input.prototype.HandlerDown = function(event){
    this[this.keys[event.keyCode]] = true;
    
    return this;
}



var Plugin = {
    name: "input",
    id: "core.input",
    path: "Input",
    construct: function(game){
        return new Input(game);
    }
}
Game.plugins.push(Plugin);



})();
