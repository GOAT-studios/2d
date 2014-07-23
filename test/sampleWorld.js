var SampleWorld = {
    blocks: {
        "": {Draw: function(){}},
        "earth": {
            sound: {
                step: "sound-step-earth"
            },
            Draw: function(d) {
                d.drawImage(d.getAsset("texture-earth"), 0, 0);
            }
        },
        "water": {
            Draw: function(d) {
                d.drawAnimation()
            }
        }
    },
    scenes: {
        level1: {
            Base: {
                Backgrounds: {
                    position: {x:0, y:0},
                    dimensions: {h:768, w:1366},
                    parallax: {x:0.75, y:1},
                    Init: function(game) {
                        game.Behaviours.Parallax.register(this, this.parallax);
                    }
                    Update: function(game) {
                        game.Behaviours.Parallax.update(this);
                    },
                    Draw: function(d) {
                        d.drawImage(d.getAsset("background1"), this.position.x, this.position.y);
                    }
                },
                Terrain: [
                    ["earth","","","earth"],
                    ["","","","earth"],
                    ["earth","","","earth"]
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
            Extensions: {
                water: {
                    Terrain: [
                        {
                            position: {x:1, y:0}, //column 1, row 0
                            block: "water"
                        }
                    ]
                },
                rightPassageClosed: {
                    Terrain: [
                        {
                            position: {x:2, y:1}, //column 2, row 1
                            block: "earth"
                        },
                        {
                            position: {x:2, y:2}, //column 2, row 2
                            block: "earth"
                        }
                    ]
                },
                enemy: {
                    Objects: [
                        {
                            position: {x:0, y:35},
                            dimensions: {w:35, h:70},
                            Init: function(game) {
                                game.Behaviours.SimpleEnemy.register(this);
                            },
                            Update: function(game) {
                                game.Behaviours.SimpleEnemy.update(this);
                            },
                            Draw: function(d) {
                                d.fillStyle("#000000").fillRect(0, 0, 35, 70);
                            }
                        }
                    ]
                }
            }
        }
    }
}