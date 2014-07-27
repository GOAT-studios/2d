(function() {



var World = function() {
    this.blocks = {};

    return this;
}

World.prototype.name = "world-sidescroller";
World.prototype.type = "World";

World.prototype.Init = function(game) {
    this.game = game;
}

World.prototype.Update = function(game) {
	
}



/**
 * Scenes
 */
World.prototype.load = function(world) {
    this.world = Game.prototype.Utils.merge({}, world);

    return this;
}

World.prototype.loadScene = function(name) {
    var modifiers = this.game.Save.file.modifiers[name] || {};
    this.currentScene = this.parseScene(this.world[name], modifiers);
    this.current = name;

    return this;
}



/**
 * Blocks
 */

World.prototype.saveBlock = function(name, block) {
    this.blocks[name] = block;

    return this;
}

World.prototype.saveBlocks = function(blocks) {
    Game.prototype.Utils.merge(this, blocks);

    return this;
}


/**
 * Parsers
 */

World.prototype.parseScene = function(scene, modifiers) {
    for(name in scene) {
        if(name !== "Base" && modifiers[name]) {
            this.mergeModifier(scene.Base, scene[name]);
        }
    }

    var scene = scene.Base;
}

World.prototype.mergeModifier = function(base, mod) {
    if(mod.Backgrounds) base.Backgrounds = base.Backgrounds.concat(mod.Backgrounds);
    if(mod.Objects) base.Objects = base.Objects.concat(mod.Objects);
    if(mod.Foregrounds) base.Foregrounds = base.Foregrounds.concat(mod.Foregrounds);
    if(mod.SpawnPoints) base.SpawnPoints = base.SpawnPoints.concat(mod.SpawnPoints);
    if(mod.Music) base.Music = base.Music.concat(mod.Music);

    if(mod.Terrain) {
        for(var i = 0, len = mod.Terrain.length; i < len; i++) {
            var block = mod.Terrain[i];
            base.Terrain[block.position.x][block.position.y] = block.block;
        }
    }

    return this;
}


/**
 * Other
 */

World.prototype.getCurrent = function() {
    return this.currentScene;
}



Game.plugins.push(World);



})();