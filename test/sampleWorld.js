var SampleWorld = {
    level1: {
        Base: {
            Backgrounds: [
                {
                    position: {x:0, y:0},
                    dimensions: {h:768, w:1366},
                    parallax: {x:0.75, y:1},
                    Update: function(game) {
                        this.position.x = game.Camera.position.x * this.parallax.x;
                        this.position.y = game.Camera.position.y * this.parallax.y;
                    },
                    Draw: function(d) {
                        d.drawImage(d.getAsset("background1"), this.position.x, this.position.y);
                    }
                }
            ],
            Terrain: [
                ["earth",""]
            ],
            Objects: [
                {
                    position: {x:0, y:0},
                    dimensions: {h:234, w:32},
                    Init: function(game) {
                        game.Behaviours.TwoPoint.register(this, {x:0, y:0}, {x:25, y:40}, 2);
                    }
                    Update: function(game) {
                        game.Behaviours.TwoPoint.update(this);
                    }
                }
            ],
            Foregrounds: [

            ],
            SpawnPoints: {
                spawnPoint1: {x:25, y:567}
            },
            Music: {
                Main: ["mainSong.mp3", "mainSong.ogg"],
                awesomeSong: ["song.mp3","song.ogg"]
            }
        },
        randomBlock: {
            Terrain: [
                {
                    position: {x:2, y:5},
                    block: "earth"
                }
            ]
        }
    }
}