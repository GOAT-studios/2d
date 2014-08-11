(function() {



var construct = function(game) {

    var ParallaxBehaviour = function(parallax) {
        this.parallax = parallax;
        this.oldCameraPos = game.Camera;

        return this;
    }

    ParallaxBehaviour.prototype.update = function(object) {
        object.position.x += (game.Camera.x - this.oldCameraPos.x) * this.parallax.x;
        object.position.y += (game.Camera.y - this.oldCameraPos.y) * this.parallax.y;

        this.oldCameraPos = game.Camera;
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
