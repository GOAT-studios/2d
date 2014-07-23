var World;

(function() {



World = function() {
    return this;
}

World.prototype.name = "world-sidescroller";
World.prototype.type = "World";

World.prototype.Init = function(game) {
    this.game = game;
}

World.prototype.load = function(world) {
    this.blocks = world.blocks;
    this.scenes = world.scenes;

    return this;
}

World.prototype.loadScene = function(name, spawnPoint) {
    var mother = this.scenes[name];
    var scene = mother[this.game.Save.loadedFile.states[name]];
    var this.currentScene = this.parseScene(scene);

    this.game.Player.spawn(this.currentScene.SpawnPoints[spawnPoint]);
    if()
}



})();