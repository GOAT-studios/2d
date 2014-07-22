var ParallaxBehaviour;

(function() {



ParallaxBehaviour = function() {
    this.objects = [];

    return this;
}

ParallaxBehaviour.prototype.name = "behaviour-parallax";
ParallaxBehaviour.prototype.type = "behaviour-parallax";

ParallaxBehaviour.prototype.Init = function(game) {
    this.game = game;
}

ParallaxBehaviour.prototype.register = function(object, parallax) {
    this.objects.push({
        object: object,
        parallax: parallax,
        oldCameraPos: this.game.Camera.position
    });

    return this;
}

ParallaxBehaviour.prototype.update = function(object) {
    var obj = this.get(object);
    var diff = {
        x: this.game.Camera.position.x - obj.oldCameraPos.x,
        y: this.game.Camera.position.y - obj.oldCameraPos.y
    }
    object.position.x += diff.x * obj.parallax.x;
    object.position.y += diff.y * obj.parallax.y;

    obj.oldCameraPos = this.game.Camera.position;

    return this;
}

ParallaxBehaviour.prototype.get = function(object) {
    for(var i = 0, len = this.objects.length; i < len; i++) {
        if(this.objects[i].object === object) {
            return this.objects[i];
        }
    }

    return null;
}



})()