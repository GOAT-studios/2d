(function() {



var ParallaxBehaviour = function(parallax, game) {
	this.game = game;
    this.parallax = parallax;
    this.oldCameraPos = game.Camera;

    return this;
}

ParallaxBehaviour.Name = "Parallax";
ParallaxBehaviour.__noConstructor = true;

ParallaxBehaviour.prototype.update = function(object) {
    var diffX = this.game.Camera.x - this.oldCameraPos.x;
    var diffY = this.game.Camera.y - this.oldCameraPos.y;
    object.position.x += diffX * this.parallax.x;
    object.position.y += diffX * this.parallax.y;

    this.oldCameraPos = this.game.Camera;
}



Game.behaviours.push(ParallaxBehaviour);



})();
