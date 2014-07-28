var SampleWorld = {
    ChrisHouliham: {
        Base: {
            Backgrounds: [
                {
                    position: {x:0, y:0},
                    dimensions: {h:768, w:1366},
                    Draw: function(d) {
                        d.drawImage(d.getAsset("background1"), this.position.x, this.position.y);
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
                        this.parralax = new game.Behaviours.Parralax(parallax: {x:0.75, y:1});
                    }
                    Update: function(game) {
                        this.parralax.update(this);
                    },
                    Draw: function(d) {
                        d.drawImage(d.getAsset("background1"), this.position.x, this.position.y);
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
                new Objects.MovingPlatform({72 * 3, 72 * 2}, {72 * 2, 72}, {72 * 3, 72 * 2}, {72 * 11, 72 *2})
            ],
            Foregrounds: [
            ],
            SpawnPoints: {
                leftDoor: {x: 0, y: 72 * 3},
                rightDoor: {x: 72 * 14, y:  72 * 3}
            },
            Music: {
                Main: ["mainSong.mp3", "mainSong.ogg"],
            }
        }
    }                    
}
