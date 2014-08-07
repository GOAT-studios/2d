var Game;



(function() {


/*
 * Game
 * ====
 *
 * The main Game constructor
 */

Game = function() {
    this.Plugins   = new Plugins(this, plugins);

    this.initTime  = null;
    this.loadTime  = null;
    this.startTime = null;
    this.pauseTime = null;
    this.stopTime  = null;

    this.playing   = false;
    this.timer     = null;
    this.frames    = 0;
    this.drawTimes = [];

    this._options = {};

    EventEmitter(this);


    return this;
}


/* Setup Engine */
Game.prototype.init = function() {
    this.emit("beforeinit", [this]);

    this.initTime = this.Utils.time();
    this.Plugins.Init(this);

    // Attach Draw.domElement to Game
    if(this.Draw && this.Draw.domElement) {
        this.domElement = this.Draw.domElement;
    }

    this.emit("init", [this]);
    return this;
}


/* Setup world */
Game.prototype.load = function() {
    if(!this.initTime) {
        this.init();
    }

    this.emit("beforeload", [this]);

    this.loadTime = this.Utils.time();
    this.Plugins.Load(this);

    this.emit("load", [this]);
    return this;
}


/* Start game loop */
Game.prototype.start = function() {
    if(!this.playing) {
        this.startTime = this.Utils.time();
        if(!this.loadTime) {
            this.load();
        }

        this.emit("beforestart", [this]);

        this.timer = this.requestAnimationFrame(this.Loop);
        this.playing = true;

        this.emit("start", [this]);
    }

    return this;
}


Game.prototype.pause = function() {
    if(this.playing) {
        this.emit("beforepause", [this]);
        this.pauseTime = this.Utils.time();
        this.cancelAnimationFrame(this.timer);
        this.playing = false;
        this.emit("pause", [this]);
    }
}


Game.prototype.stop = function() {
    if(this.playing) {
        this.emit("beforestop", [this]);
        this.stopTime = this.Utils.time();
        this.cancelAnimationFrame(this.timer);
        this.playing = false;
        this.emit("beforestopreset");
        this.reset();
        this.emit("stop", [this]);
    }

    return this;
}


Game.prototype.Loop = function(game) {
    var START = game.Utils.time();
    game.emit("beforeframe", [game]);
    game.frames++;

    game.emit("beforeupdate", [game]);
    game.Plugins.Update(game);

    game.emit("beforedraw", [game]);
    game.World.Draw(game);

    game.emit("frame", [game]);

    var END = game.Utils.time();
    game.drawTimes.push(END - START);
    return game;
}


Game.prototype.Utils = {
    capitalize: function(str) {
        return str.substr(0,1).toUpperCase() + str.substr(1);
    },
    merge: function(first, second, blacklist) {
        if(!blacklist) var blacklist = [];

        for(key in second) {
            if(blacklist.indexOf(key) === -1) {
                first[key] = second[key];
            }
        }

        return first;
    },
    toRadians: function(deg) {
        return (deg * Math.PI) / 180;
    },
    toDegrees: function(rad) {
        return (rad * 180) / Math.PI;
    },
    time: (function() {
        if(performance && performance.now) {
            return function() { return performance.now(); }
        } else if(performance && performance.webkitNow) {
            return function() { return performance.webkitNow(); }
        } else {
            return function() { return Date.now(); }
        }
    })()
}


Game.prototype.options = function(options) {
    this.Utils.merge(this.options, options);

    return this;
}


Game.prototype.plugin = function(plugin) {
    this.Plugins.add(plugin);

    this.emit("plugin", [this, plugin]);
    return this;
}

Game.prototype.plugins = function(plugins) {
    this.Plugins.addMultiple(plugins);

    this.emit("plugins", [this, plugins]);
    return this;
}


Game.prototype.category = function(category) {
    this.Categories.add(category);

    this.emit("category", [this, category]);
    return this;
}

Game.prototype.getAverageDrawTime = function() {
    var sum = 0;
    var len = this.drawTimes.length;
    for(var i = 0; i < len; i++) {
        sum += this.drawTimes[i];
    }

    return sum / len;
}

// Add Polyfill HERE!
Game.prototype.requestAnimationFrame = function() {
    var game = this;
    var cb = function() {game.Loop(game);}
    this.timer = requestAnimationFrame(cb);
    return this;
}

//Add Polyfill HERE!
Game.prototype.cancelAnimationFrame = function() {
    cancelAnimationFrame(this.timer);
    return this;
}






/*
 * Plugins
 * =======
 *
 * The Plugins constructor
 * Provides the plugin system for Game
 */

var Plugins = function(game) {
    //Save Game for later
    this.game = game;
    this.plugins = {};

    return this;
}

Plugins.prototype.add = function(plugin) {
    if(typeof plugin === "string") {
        // Get the plugin from Game.plugins
        for(var i = 0, len = Game.plugins.length; i < len; i++) {
            if(Game.plugins[i].Name === plugin || Game.plugins[i].prototype.Name === plugin) {
                var plugin = Game.plugins[i];
                break;
            }
        }
        // call new plugin() if it is a constructor
        var plugin = plugin.__noConstructor ? plugin : new plugin(this.game);
    }

    var type = plugin.Type = this.game.Utils.capitalize(plugin.Type);
    var name = plugin.Name;

    //This type is not yet registered
    if(!this.plugins[type]) {
        this.plugins[type] = [];
    }

    //Remove all plugins with the same name
    this.remove(name);
    //Push to plugin pool
    this.plugins[type].push(plugin);

    //Initialize the plugin
    if(this.initTime && plugin.Init) {
        plugin.Init(this.game);
    }
    //Load plugin
    if(this.loadTime && plugin.Load) {
        plugin.Load(this.game);
    }

    //Use the new plugin
    this.use(name);

    return this;
}

Plugins.prototype.addMultiple = function(plugins) {
    for(var i = 0, len = plugins.length; i < len; i++) {
        this.add(plugins[i]);
    }

    return this;
}

Plugins.prototype.remove = function(name) {
    var self = this;

    this.loop(function(plugin, index, array) {
        if(plugin.Name === name) {
            //Remove plugin from plugin list
            array.splice(index, 1);

            var type = plugin.Type;
            if(self.game[type] === plugin) {
                //Remove plugin from game
                self.game[type] = null;
                if(self.plugins[type] && self.plugins[type].length) {
                    //Add last added plugin to the game
                    self.game[type] = self.plugins[type].slice(-1)[0];
                }
            }
        }
    });


    return this;
}

Plugins.prototype.get = function(name, warn) {
    var Plugin = null;

    //Loop through all the plugins and get the right one out
    this.loop(function(plugin, index, array) {
        if(plugin.Name === name) {
            Plugin = plugin;
            return true;
        }
    });


    return Plugin;
}

Plugins.prototype.use = function(name) {
    var plugin = this.get(name);

    //Plugin exists
    if(plugin) {
        var type = plugin.Type;

        this.game[type] = plugin;
        if(plugin.Use) {
            plugin.Use(this.game);
        }
    }

    return this;
}

Plugins.prototype.loop = function(cb) {
    //Loop through types
    outer:
    for(type in this.plugins) {
        var plugins = this.plugins[type];

        //Loop through plugins (per type)
        for(var i = 0; i < plugins.length; i++) {
            var br = cb(plugins[i], i, this.plugins[type]);
            // Break loop if `cb` returns `true` (or another truthy value)
            if(br) { break outer; }
        }
    }

    return this;
}

Plugins.prototype.Init = function(game) {
    this.loop(function(plugin) {
        if(plugin.Init) {
            plugin.Init(game);
        }
    });

    this.initTime = game.Utils.time();

    return this;
}

Plugins.prototype.Load = function(game) {
    this.loop(function(plugin) {
        if(plugin.Load) {
            plugin.Load(game);
        }
    });

    this.loadTime = game.Utils.time();

    return this;
}

Plugins.prototype.Update = function(game) {

    this.loop(function(plugin) {
        if(plugin.Update) {
            plugin.Update(game);
        }
    });

    return this;
}





/*
 * EventEmitter
 *
 * EventEmitter allows for easy event registering and emitting. The API is a copy of the Node.js EventEmitter class.
 */

var EventEmitter = function(obj) {
    if(!obj) obj = this;

    obj.__events = {};
    obj.__allEvents = [];

    obj.addListener = obj.on = function(event, listener) {
        if(!this.__events[event]) this.__events[event] = [];

        if(listener) {
            this.__events[event].push(listener);
        }
        else {
            this.__allEvents.push(event); // event is now the callback
        }

        return this;
    }

    obj.once = function(event, listener) {
        if(!this.__events[event]) this.__events[event] = [];

        if(listener) {
            var func = function() {
                listener.call(null, arguments);
                obj.removeListener(event, func);
            }
            this.__events[event].push(func);
        }
        else {
            var func = function() {
                event.call(null, arguments);
                obj.removeListener(func);
            }
            this.__allEvents.push(func);
        }

        return this;
    }

    obj.emit = function(event, args) {
        if(!args) args = [];
        if(this.__events[event]) {
            var listeners = this.__events[event];
            for(var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].apply(null, args);
            }
        }
        var args = [event].concat(args);
        for(var i = 0, len = this.__allEvents.length; i < len; i++) {
            this.__allEvents[i].apply(null, args);
        }

        return this;
    }

    obj.removeListener = function(event, listener) {
        if(!listener) {
            var listener = event;
            for(event in this.__events) {
                this.removeListener(event, listener);
            }
        }
        else {
            var listeners = this.__events[event];
            if(listeners.indexOf(listener) !== -1) {
                listeners.splice(listeners.indexOf(listener), 1);
            }
            if(this.__allEvents.indexOf(listener) !== -1) {
                this.__allEvents.splice(this.__allEvents.indexOf(listener), 1);
            }
        }

        return this;
    }

    obj.removeAllListeners = function(event) {
        this.__events[event] = [];

        return this;
    }

    obj.listeners = function(event) {
        return this.__events[event] || [];
    }


    return obj;
}

Game.prototype.EventEmitter = EventEmitter;



Game.plugins = [];






/*
 * VARS
 * ====
 *
 * Some variables used  by Game.
 */

    var container = Game.prototype.container = document.createElement("div");
    container.setAttribute("id", "2D-loaders");
    container.setAttribute("style", "width:0;height:0;visibility:hidden;overflow:hidden");
    document.addEventListener("load", function() {
        document.body.appendChild(container);
    });


})();