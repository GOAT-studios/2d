var Game;



(function() {


/*
 * Game
 * ====
 *
 * The main Game constructor
 */

Game = function() {
    this.Plugins   = new Plugins(this);

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

        this.timer = this.requestAnimationFrame();
        this.playing = true;

        this.emit("start", [this]);
    }

    return this;
}


Game.prototype.pause = function() {
    if(this.playing) {
        this.emit("beforepause", [this]);
        this.pauseTime = this.Utils.time();
        this.cancelAnimationFrame();
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

Game.prototype.reset = function() {
    this.emit("beforereset", [this]);

    this.startTime = null;
    this.pauseTime = null;
    this.playing = false;
    this.frames = 0;
    this.drawTimes = [];

    this.emit("reset", [this]);

    return this;
}


Game.prototype.Loop = function(game) {
    var START = game.Utils.time();
    game.emit("beforeframe", [game]);
    game.frames++;

    game.emit("beforeupdate", [game]);
    game.Plugins.Update(game);

    game.emit("beforedraw", [game]);
    if(game.World && game.World.Draw) game.World.Draw(game);

    game.requestAnimationFrame();

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
    this.Utils.merge(this._options, options);

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
 * Provides the plugin system to Game
 */

var Plugins = function(game) {
    this.game = game;
    this.plugins = [];

    return this;
}

Plugins.prototype.add = function(plugin) {
    if(typeof plugin === "string") {
        var plugin = this.getFromString(plugin);
    }

    //If the plugin should be constructed, construct it and attach the result to plugin.content
    if(!plugin.content) plugin.content = plugin.construct(this.game);
    this.plugins.push(plugin);

    //Call Init and Load
    if(this.initTime && plugin.plugin.Init) {
        plugin.plugin.Init(this.game);
    }
    if(this.loadTime && plugin.plugin.Load) {
        plugin.plugin.Load(this.game);
    }

    // Attach the plugin to the game
    this.attach(plugin);

    return this;
}

Plugins.prototype.addMultiple = function(plugins) {
    for(var i = 0, len = plugins.length; i < len; i++) {
        this.add(plugins[i]);
    }

    return this;
}

Plugins.prototype.remove = function(id) {
    for(var i = 0, len = this.plugins.length; i < len; i++) {
        var plugin = this.plugins[i];
        if(plugin.name === id || plugin.id === id) {
            this.plugins.splice(i, 1);
            break;
        }
    }

    this.unAttach(plugin);

    return this;
}

Plugins.prototype.get = function(id) {
    for(var i = 0, len = this.plugins.length; i < len; i++) {
        if(this.plugins[i].name === id || this.plugins[i].id === id) {
            return this.plugins[i];
        }
    }

    return null;
}

Plugins.prototype.attach = function(plugin) {
    var steps = plugin.path.split(".");
    lastStep = this.game;
    for(var i = 0, len = steps.length - 1; i < len; i++) {
        if(!lastStep[steps[i]]) lastStep[steps[i]] = {};
        lastStep = lastStep[steps[i]];
    }
    lastStep[steps[steps.length-1]] = plugin.content;

    return this;
}

Plugins.prototype.unAttach = function(plugin) {
    var steps = plugin.path.split(".");
    lastStep = this.game;
    for(var i = 0, len = steps.length - 1; i < len; i++) {
        lastStep = lastStep[steps[i]];
    }
    lastStep[steps[steps.length-1]] = null;

    return this;
}

Plugins.prototype.getFromString = function(str) {
    for(var i = 0, len = Game.plugins.length; i < len; i++) {
        if(Game.plugins[i].name === str || Game.plugins[i].id === str) {
            return Game.plugins[i];
        }
    }

    return null;
}


Plugins.prototype.Init = function(game) {
    for(var i = 0, len = this.plugins.length; i < len; i++) {
        if(this.plugins[i].Init) {
            this.plugins[i].Init(game);
        }
    }

    this.initTime = game.Utils.time();

    return this;
}

Plugins.prototype.Load = function(game) {
    for(var i = 0, len = this.plugins.length; i < len; i++) {
        if(this.plugins[i].Load) {
            this.plugins[i].Load(game);
        }
    }

    this.loadTime = game.Utils.time();

    return this;
}

Plugins.prototype.Update = function(game) {
    for(var i = 0, len = this.plugins.length; i < len; i++) {
        if(this.plugins[i].Update) {
            this.plugins[i].Update(game);
        }
    }

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
    container.setAttribute("id", "loaders-2D");
    container.setAttribute("style", "width:0;height:0;visibility:hidden;overflow:hidden");
    document.addEventListener("DOMContentLoaded", function() {
        document.body.appendChild(container);
    });


})();