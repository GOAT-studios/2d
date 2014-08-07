var SampleWorld = {
    ChrisHouliham: {
        Base: {
            Backgrounds: [
                {
                    position: {x:0, y:0},
                    dimensions: {h:768, w:1366},
                    Draw: function(d) {
                        d.drawImage(d.getAsset("background1").element, this.position.x, this.position.y);
                    }
                }
            ],
            Terrain: [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ],
            Objects: [
            ],
            Foregrounds: [
            ],
            SpawnPoints: {
                main: {x: 0, y: 72 * 2}
            },
            Music: {
                Main: ["mainSong.mp3", "mainSong.ogg"],
            }
        }
    },
    TestScene: {
        Base: {
            Backgrounds: [
                {
                    position: {x:0, y:0},
                    dimensions: {h:72 * 20, w: 72 * 20},
                    Init: function(game) {
                        this.parallax = new game.Behaviours.Parallax({x:0.75, y:1}, game);
                    },
                    Update: function(game) {
                        this.parallax.update(this);
                    },
                    Draw: function(d) {
                        d.drawImage(d.getAsset("background1").element, this.position.x, this.position.y);
                    }
                }
            ],
            Terrain: [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
                [1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
                [1,1,1,2,2,2,2,2,2,2,2,2,1,1,1]
            ],
            Objects: [
                new Objects.TestPlatform({x: 72 * 3, y: 72 * 2}, {w: 72 * 2,h: 72}, {x: 72 * 3,y: 72 * 2}, {x:72 * 11, y: 72 *2})
            ],
            Foregrounds: [
            ],
            SpawnPoints: {
                leftDoor: {x: 0, y: 72 * 3},
                rightDoor: {x: 72 * 14, y:  72 * 3}
            },
            Music: {
                Main: ["mainSong.mp3", "mainSong.ogg"],
            },
            Player: {
                position:{x:0, y:0},
                dimensions: {w:72, h:72*2},
                Init: function(game) {
                    this.game = game;
                    this.behaviour = new game.Behaviours.TwoPoints({x:0, y:0}, {x:50, y:0}, 5);
                },
                Update: function(game) {
                    this.behaviour.update(this);
                },
                Draw: function(d) {
                    d.fillStyle("#FF0000").strokeStyle("#000000").lineWidth(3).fullRect(0, 0, this.dimensions.w, this.dimensions.h);
                }
            }
        }
    }                    
}
