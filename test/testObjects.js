v-ar Objects = function(){
    return this;
}
Objects.prototype.Draw(object){
}

Objects.prototype.TestObject = function(options) {
    this.position = options.position;
    this.dimension= options.dimentsion;
    return this;
}
Objects.prototype.TestObject.prototype.Init = function(game) {
    this.collider = new game.Colliders.Box(new game.Colliders.Vector(this.position.x, this.position.y), this.dimension.w, this.dimension.h).toPolygon();
    return this;
}
Objects.prototype.TestObject.prototype.Update = function(game) {
    return this;
    
}
Objects.prototype.TestObject.prototype.Move   = function(direction){
    this.position.x += direction.x;
    this.position.y += direction.y;
    this.collider.translate(direction.x, direction.y);
    return this;
}