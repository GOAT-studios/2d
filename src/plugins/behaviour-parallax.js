(function() {



var construct = function(game) {

    var ParallaxBehaviour = function(parallax) {
        this.parallax = parallax;
        this.oldCamera = game.Camera;

        return this;
    }

    ParallaxBehaviour.prototype.update = function(object) {
        object.position.x += (game.Camera.x - this.oldCamera.x) * this.parallax.x;
        object.position.y += (game.Camera.y - this.oldCamera.y) * this.parallax.y;

        this.oldCamera = game.Camera;
    }



    return ParallaxBehaviour;
}



var Plugin = {
    name: "behaviour-parallax",
    id: "core.behaviour-parallax",
    path: "Behaviours.Parallax",
    construct: construct
}
Game.plugins.push(Plugin);



})();
