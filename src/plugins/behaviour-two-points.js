(function() {



TwoPointBehaviour = function() {
    this.objects = [];

    return this;
}

TwoPointBehaviour.prototype.name = "behaviour-two-point";
TwoPointBehaviour.prototype.type = "behaviour-two-point";

TwoPointBehaviour.prototype.register = function(object, point1, point2, speed) {
    var length = Math.sqrt( Math.pow(point2.x - poin1.x, 2) + Math.pow(point2.y - point1.y, 2) );
    var diff = {
        x: (speed * (point2.x - point1.x)) / length,
        y: (speed * (point2.y - point1.y)) / length
    };

    this.objects.push({
        object: object,
        point1: point1,
        point2: point2,
        speed:  speed,
        length: length,
        diff:   diff,
        max: {
            x: Math.max(point1.x, point2.x),
            y: Math.max(point1.y, point2.y)
        },
        min: {
            x: Math.min(point1.x, point2.x),
            y: Math.min(point1.y, point2.y)
        }
    });

    return this;
}

TwoPointBehaviour.prototype.update = function(object) {
    var obj = this.get(object);

    if(obj) {
        var object = obj.object;
        var diff = obj.diff;

        object.position.x += diff.x;
        object.position.y += diff.y;

        if(object.position.x < obj.min.x || object.position.y < obj.min.y || object.position.x > obj.max.x || object.position.y > ovj.max.y) {
            obj.diff.x = -obj.diff.x;
            obj.diff.y = -obj.diff.y;

            object.position.x += diff.x;
            object.position.y += diff.y;
        }
    }


    return this;
}

TwoPointBehaviour.prototype.get = function(object) {
    for(var i = 0, len = this.objects.length; i < len; i++) {
        if(this.objects[i] === object) {
            return this.objects[i];
        }
    }

    return null;
}



Game.plugins.push(TwoPointBehaviour);



})();