(function() {



var TwoPointBehaviour = function(point1, point2, speed) {
    var length = Math.sqrt( Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2) );

    this.point1 = point1;
    this.point2 = point2;
    this.speed  = speed;
    this.length = length;

    this.diff = {
        x: (speed * (point2.x - point1.x)) / length,
        y: (speed * (point2.y - point1.y)) / length
    }
    this.max = {
        x: Math.max(point1.x, point2.x),
        y: Math.max(point1.y, point2.y)
    }
    this.min = {
        x: Math.min(point1.x, point2.x),
        y: Math.min(point1.y, point2.y)
    }

    return this;
}

TwoPointBehaviour.Name = "TwoPoints";
TwoPointBehaviour.__noConstructor = true;

TwoPointBehaviour.prototype.update = function(object) {
    object.position.x += this.diff.x;
    object.position.y += this.diff.y;

    if(object.position.x < this.min.x || object.position.y < this.min.y || object.position.x > this.max.x || object.position.y > this.max.y) {
        this.diff.x = -this.diff.x;
        this.diff.y = -this.diff.y;

        object.position.x += this.diff.x;
        object.position.y += this.diff.y;
    }

    return this;
}



Game.behaviours.push(TwoPointBehaviour);



})();