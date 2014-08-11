var Blocks = {
	0: {},
	1: {
		Draw: function(d) {
			d.fillStyle("#00CC00").fillRect(0, 0, 72, 72);
		}
	},
	2: {
		Draw: function(d) {
			d.drawSprite(this.sprite, 0, 0);
		}
	}
}

game.World.saveObjects(Blocks);