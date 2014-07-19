var SampleWorld = [
	{
		name: "level1",
		index: 0,
		scenes: [
			{
				name: "level1",
				Backgrounds: [
					{
						position: {x:0, y:0},
						dimensions: {h:3523, w:346332534634345254243},
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
					{
						position: {x:0, y:0},
						type: "earth",
						Draw: function(d) {
							d.drawImage(d.getAsset("sprite-earth"), 0, 0);
						}
					}
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
				SpawnPoints: [

				],
				Music: {

				}
			}
		]
	}
]