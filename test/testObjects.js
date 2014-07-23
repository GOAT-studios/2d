var Objects = {

    TestObject: {
    
        position: {x:0, y:0},
        dimensions: {h:234, w:32},
        Init: function(game) {
            game.Behaviours.TwoPoint.register(this, {x:0, y:0}, {x:25, y:40}, 2);
        },
        Update: function(game) {
            game.Behaviours.TwoPoint.update(this);
        }
    }
}