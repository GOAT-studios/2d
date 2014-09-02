(function() {



var Input = function(game) {
    this.keys = {};
    
    game.on("afterinit", this.Init);
    return this;
}

Input.prototype.Init = function(game) {
    game.domElement.addEventListener("keydown", this.HandlerDown);
    game.domElement.addEventListener("keyup", this.HandlerUp);

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
