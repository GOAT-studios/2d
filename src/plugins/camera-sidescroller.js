(function () {



var construct = function(game) {


    var Camera = function() {
        this.x = 0;
        this.y = 0;
        this.offset = {
            x:0, y:0
        }
        this.static = false;

        game.on("update", this.Update);

        return this;
    }

    Camera.prototype.Update = function() {
        if(!this.static) {
            var player = game.Player;
            this.x = player.x - ((game.width/2)  - (player.width/2))  + this.offset.x;
            this.y = player.y - ((game.height/2) - (player.height/2)) + this.offset.y;
        }

        return this;
    }

    Camera.prototype.translate = function(vector) {
        if(this.static) {
            this.x += vector.x;
            this.y += vector.y;
        }
        else {
            this.offset.x += vector.x;
            this.offset.y += vector.y;
            this.Update();
        }

        return this;
    }

    Camera.prototype.moveTo = function(vector) {
        this.static = true;
        this.x = vector.x;
        this.y = vector.y;

        return this;
    }

    Camera.prototype.followPlayer = function() {
        this.static = false;
        this.Update();

        return this;
    }

    Camera.prototype.unFollowPlayer = function() {
        var player = this.game.Player;

        this.static = true;
        this.x += offset.x;
        this.y += offset.y;
        this.offset.x = 0;
        this.offset.y = 0;

        return this;
    }


    return new Camera();

}



var Plugin = {
    name: "camera-sidescroller",
    id: "core.camera-sidescroller",
    path: "Camera",
    construct: construct
}
Game.plugins.push(Plugin);



})()