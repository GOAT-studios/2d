var SampleWorld = {
    ChrisHouliham: {
        //The ChrisHouliham room is a anti - glitch measurament in case the game wants to load a non-existant scene. The name is a reference to a similar hidden room used in "A Legend Of Zelda: A Link To The Past".
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
                // ( {x,y} ,SceneName , SpawnPointName)
                new Objects.WarpTile({x: 0,y: 72 * 2}, "TestRoomB", "leftDoor")
            ],
            Foregrounds: [
                {
                    position: {x:0, y:0},
                    dimensions: {h:768, w:1366},
                    Draw: function(d) {
                        d.drawImage(d.getAsset("foreground1").element, this.position.x, this.position.y);
                    }
                }
            ],
            SpawnPoints: {
                main: {x: 0, y: 72 * 2}
            },
            Music: {
                main: ["mainSong.mp3", "mainSong.ogg"]
            }
        }
    },
    TestRoomB: {
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
                // 2 is are spike blocks.
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
                new Objects.WarpTile({x: 72 * 14,y: 72 * 3}, "TestRoomC", "leftDoor"), new Objects.WarpTile({x: 0,y: 72 * 3}, "TestRoomA", "rightDoor"), new Objects.TestPlatform({x: 72 * 3, y: 72 * 2}, {w: 72 * 2,h: 72}, {x: 72 * 3,y: 72 * 2}, {x:72 * 11, y: 72 *2})
            ],
            Foregrounds: [
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
                        d.drawImage(d.getAsset("foreground1").element, this.position.x, this.position.y);
                    }
                }
            ],
            SpawnPoints: {
                leftDoor: {x: 0, y: 72 * 3},
                rightDoor: {x: 72 * 14, y:  72 * 3}
            },
            Music: {
                Main: ["mainSong.mp3", "mainSong.ogg"]
            }
        }
    }                    
}