(function() {



var construct = function(game) {

    var ParallaxBehaviour = function(parallax) {
        this.parallax = parallax;
        this.oldCameraPos = game.Camera;

        return this;
    }

    ParallaxBehaviour.prototype.update = function(object) {
        var diffX = game.Camera.x - this.oldCameraPos.x;
        var diffY = game.Camera.y - this.oldCameraPos.y;
        object.position.x += diffX * this.parallax.x;
        object.position.y += diffX * this.parallax.y;

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
