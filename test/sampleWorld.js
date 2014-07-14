var SampleWorld = {
	name: "sample",
	type: "sidescroller",
	Blocks: {
		background: function(d) { //Object = function that draw itself
			d.drawImage(d.getAsset("background.png"), 0, 0, d.getCanvasWidth(), d.getCanvasHeight());
		},
		earth: function(d) {
			d.drawImage(d.getAsset("earth.jpg"), 0, 0, d.getWidth(), d.getHeight());
		},
		earthTop: function(d) {
			d.drawImage(d.getAsset("earth-top.jpg"), 0, 0, d.getWidth(), d.getHeight());
		},
		empty: function() {},
		door: function(d) {
			d.fillStyle("#242424").fillRect(-3, (d.getHeight()/2)+1, 4, 2);
			d.fillStyle("#663300").fillRect(0, 5, 1, (d.getHeight()/2)-10)
			                      .fillRect(0, (d.getHeight()/2)+5, 1, (d.getHeight()/2)-10)
			                      .fillRect(1, 0, d.getWidth()-1, d.getHeight());
		}
	},
	Levels: [ //World->levels
		[ //Level->categories
			{ //Category->Objects
				"name": "backgrounds",
				"Objects": [
					"background"
				]
			},
			{
				"name": "blocks",
				"Objects": [
					["earth","earth","earth","earth","earth","earth","earth","earth","earth","earth","earth","earth"],
					["earth","earth","earth","empty","empty","empty","empty","earth"],
					["earth","earth","earth","empty","empty","empty","empty","earth"],
					["earth","earth","earth"],
					["earth","earth","earth","earth"],
					["earth","earth","earth","empty","empty","empty","earth"],
					["earth","earth","earth","empty","empty","empty","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth"],
					["earth","earth","earth","empty","empty","empty","earth"],
					["earth","earth","earth","empty","empty","empty","earth"],
					["earth","earth","earth"],
					["earth","earth","earth","empty","empty","empty","empty","earth"],
					["earth","earth","earth","empty","empty","empty","empty","earth","earth"],
					["earth","earth","earth","earth","earth","earth","earth","earth","earth","earth","earth","earth"]
				]
			},
			{
				"name": "objects",
				"Objects": [
					{
						name: "door",
						position: {
							x: 25*35-5,
							y: 3*35
						},
						width: 10,
						height: 2*35,
						Draw: "door"
					},
					{
						"name": "door",
						position: {
							x: 25*35-5,
							y: 9*35
						},
						width: 10,
						height: 2*35,
						Draw: "door"
					}
				]
			},
			{
				name: "player",
				life: 100,
				money: 0,
				items: {
					sword: 1,
					chestPlate: 1,
					bread: 4,
					wood: 0,
					gun: 0
				}
			}
		]
	]
}