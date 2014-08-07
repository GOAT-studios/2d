(function() {



var World = function(game) {
    this.game = game;
    this.objects = {};

    this.blockSize = {width:72, height:72};

    game.Save = {
        modifiers:{
            level1: {
                randomBlock:true
            }
        }
    };

    return this;
}

World.prototype.Name = "world-sidescroller";
World.prototype.Type = "World";

World.prototype.Update = function(game) {
// filter matches anything except 'terrainBuffer'
    var filter = /^(?!terrainBuffer)/i;
	this.loop(game.Categories, filter, function(type, object) {
        if(object.Update) object.Update(game);
    });

    this.updateBuffer(game);

    return this;
}

World.prototype.Draw = function(game) {
    var game = this.game;
    var Camera = game.Camera;
    var Draw = game.Draw;
    var d = Draw.instance;
    var blockSize = this.blockSize;
// terrainType matches anything except 'terrainBuffer'
    var terrainType = /^(?!terrainBuffer)/i;
    var otherType = /^(backgrounds|foregrounds|objects)$/i;
    var allTypes = /^(backgrounds|foregrounds|objects|terrainBuffer)$/i

    this.loop(game.Categories, allTypes, function(type, object, i) {
        if(otherType.test(type) && object.Draw) {
            Draw.x = object.position.x;
            Draw.y = object.position.y;
            Draw.width = object.dimensions.width;
            Draw.height = object.dimensions.height;
            object.Draw(d);
        }
        else if(terrainType.test(type) && object.Draw) {
            Draw.x = (i.x * blockSize.width) - Camera.x;
            Draw.y = (game.height - ((i.y + 1) * blockSize.height)) + Camera.y;
            Draw.width = blockSize.width;
            Draw.height = blockSize.height;
            object.Draw(d);
        }
    });

    return this;
}



/**
 * Scenes
 */
World.prototype.load = function(world) {
    this.world = world;

    return this;
}

World.prototype.loadScene = function(name) {
    this.current = name;
    var modifiers = this.game.Save.modifiers[name] || {};
    this.currentScene = this.parseScene(this.world[name], modifiers);
    
    for(name in this.currentScene) {
        this.game.Categories.add(name, this.currentScene[name]);
    }

    var game = this.game;
// filter matches anything except 'terrainBuffer'
    var filter = /^(?!terrainBuffer)/i
    this.loop(game.Categories, filter, function(type, object) {
        if(object.Init) object.Init(game);
    });

    this.game.load();
    

    return this;
}



/**
 * Blocks
 */

World.prototype.saveObject = function(name, object) {
    this.object[name] = object;

    return this;
}

World.prototype.saveObjects = function(object) {
    Game.prototype.Utils.merge(this.objects, object);

    return this;
}


/**
 * Parsers
 */

World.prototype.parseScene = function(Scene, modifiers) {
// Copy Base
    var scene = Game.prototype.Utils.merge({}, Scene.Base);
// Loop through the modifiers
    for(name in Scene) {
// Check if the modifier is not called Base (that's the base scene) and the modifier should be included
        if(name !== "Base" && modifiers[name]) {
// Merge the modifier (changes <scene>)
            this.mergeModifier(scene, Scene[name]);
        }
    }

    this.replaceObjects(scene);

    return scene;
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

World.prototype.updateBuffer = function(game) {
    var rows = {
        min: Math.floor(game.Camera.y % this.blockSize.height),
        max: Math.ceil((game.Camera.y+game.canvasHeight) % this.blockSize.height)
    }
    var columns = {
        min: Math.floor(game.Camera.x % this.blockSize.width),
        max: Math.ceil((game.Camera.x+game.canvasWidth) % this.blockSize.width)
    }

    var buffer = game.Categories.Terrain.slice(rows.min, rows.max);
    buffer = buffer.map(function(row) {
        return column.slice(columns.min, columns.max);
    });
    game.Categories.add("terrainBuffer", buffer);

    return this;
}

World.prototype.loop = function(scene, filter, cb) {
// If no filter is given, use a filter that matches anything (. matches anything except newlines, \n matches newlines)
    if(typeof filter === "function") {cb = filter; filter = /(.|\n)*/i};

    if(filter.test("backgrounds")) {
        var backgrounds = scene.Backgrounds;
        for(var i = 0, len = backgrounds.length; i < len; i++) {
            cb("backgrounds", backgrounds[i], i, backgrounds);
        }
    }

    if(filter.test("terrain")) {
        var terrain = scene.Terrain;
        for(var i = 0, len = terrain.length; i < len; i++) {
            var column = terrain[i];

            for(var j = 0, lenj = column.length; j < lenj; j++) {
                cb("terrain", column[j], {x:i,y:j}, column);
            }
        }
    }

    if(filter.test("terrainBuffer")) {
        var terrainBuffer = scene.TerrainBuffer;
        for(var i = 0, len = terrainBuffer.length; i < len; i++) {
            var column = terrainBuffer[i];

            for(var j = 0, lenj = column.length; j < lenj; j++) {
                cb("terrainBuffer", column[j], {x:i,y:j}, terrainBuffer);
            }
        }
    }

    if(filter.test("objects")) {
        var objects = scene.Objects;
        for(var i = 0, len = objects.length; i < len; i++) {
            cb("objects", objects[i], i, objects);
        }
    }

    if(filter.test("foregrounds")) {
        var foregrounds = scene.Foregrounds;
        for(var i = 0, len = foregrounds.length; i < len; i++) {
            cb("foregrounds", foregrounds[i], i, foregrounds);
        }
    }

    if(filter.test("spawnPoints")) {
        var spawnpoints = scene.SpawnPoints;
        for(var i = 0, len = spawnpoints.length; i < len; i++) {
            cb("spawnpoints", spawnpoints[i], i, spawnpoints);
        }
    }


    return this;
}

World.prototype.replaceObjects = function(scene) {
    var objects = this.objects;
// filter matches anything except 'terrainBuffer'
    var filter = /^(?!terrainBuffer)/i

    this.loop(scene, filter, function(type, object, index, array) {
        if(typeof object === "string" || typeof object === "number") {
            if(/terrain/i.test(type)) {
                array[index.y] = objects[object];
            }
            else {
                array[index] = objects[object];
            }
        }
    });

    return this;
}

World.prototype.setBlockSize = function(width, height) {
    this.blockSize = {width: width || 72, height: height || 72};

    return this;
}

World.prototype.getCurrent = function() {
    return this.currentScene;
}



Game.plugins.push(World);



})();