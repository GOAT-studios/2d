var Game;



(function() {




	Game = function(options, plugins) {
		if(!options) {
			var options = {};
			console.warn(warnings.noOptions);
		}
		if(!plugins) {
			var plugins = {};
			console.warn(warnings.noPluginsConstructor);
		}


		this.options = options;


		return this;
	}



	Game.prototype.Plugins    = {};
	Game.prototype.Utils      = {};
	Game.prototype.Camera     = {};
	Game.prototype.Categories = {};
	Game.prototype.Assets     = {};
	Game.prototype.Colliders  = {};
	Game.prototype.Sound      = {};







	var warnings = {
		"noOptions": "WARN: No options passed to the constructor. Default options will be used.",
		"noPluginsConstructor": "WARN: No plugins passed to the constructor. Make sure to add plugins with 'Game.plugin(type, plugin);'."
	}


})();