(function() {



var Player = function(game) {
	var self = this;
	this.game = game;
	this.options = {};
	this.position = {};
	this.speed = 5;

	game.EventEmitter(this);

	game.on("init", function(game) {
		var player = game.Player;
		player.position = new game.Colliders.Vector(0,0);
		player.collider = new game.Colliders.Box(new game.Colliders.Vector(player.position.x, player.position.y), player.dimensions.w, player.dimensions.h).toPolygon();
	});

	return this;
}

Player.prototype.Init = function(game) {
	this.dimensions = {w:1*game.blockSize.w, h:2*game.blockSize.h};
}

Player.prototype.Load = function(game) {
	//Edit Collider/position
}

Player.prototype.Update = function(game) {
	if(!(game.Input.right && game.Input.left)) {
		if(game.Input.right) {
			this.Move({x:this.speed, y:0});
		}
		if(game.Input.left) {
			this.Move({x:-this.speed, y:0});
		}
	}

	return this;
}

Player.prototype.Move = function(vector) {
	this.position.add(vector);
	this.collider.pos.add(vector);

	var player = this;
	var game = this.game;
	var filter = /^(terrainBuffer|objects)$/i;
	var res = new game.Colliders.Response();
	game.World.loop(game.Categories, filter, function(type, object) {
		if(object.collider) {
			res.clear();
			if(game.Colliders.test(player.collider, object.collider, res)) {
				if(object.Collide) object.Collide(player, res);
				player.emit("collide", [player, res, game]);
				player.Move(res.overlapV);
			}
		}
	});

	return this;
}

Player.prototype.setOptions = function(options) {
	Game.prototype.Utils.merge(this.options, options);

	return this;
}

Player.prototype.setDimensions = function(dimensions) {
	Game.prototype.Utils.merge(this.dimensions, dimensions);

	return this;
}

Player.prototype.setSpeed = function(speed) {
	this.speed = speed;

	return this;
}



var Plugin = {
	name: "player-sidescroller",
	id: "core.player-sidescroller",
	path: "Player",
	construct: function(game) {
		return new Player(game);
	}
}
Game.plugins.push(Plugin);



})();