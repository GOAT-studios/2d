(function() {



var ParallaxBehaviour = function(parallax) {
    this.parallax = parallax;
    this.oldCameraPos = this.game.Camera.position;

    return this;
}

ParallaxBehaviour.prototype.name = "behaviour-parallax";
ParallaxBehaviour.prototype.type = "behaviour-parallax";

ParallaxBehaviour.Init = function(game) {
    this.prototype.game = game;
}

ParallaxBehaviour.prototype.update = function(object) {
    var diffX = this.game.Camera.position.x - this.oldCameraPos.x;
    var diffY = this.game.Camera.position.y - this.oldCameraPos.y;
    object.position.x += diffX * this.parallax.x;
    object.position.y += diffX * this.parallax.y;

    this.oldCameraPos = this.game.Camera.position;
}



if(!Game.behaviours) Game.behaviours = [];
Game.behaviours.push(Plugin);



})();