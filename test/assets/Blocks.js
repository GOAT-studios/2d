var Blocks = {
	TestBlock: {
		Draw: function(d) {
			d.fillStyle("#00CC00").fillRect(0, 0, 72, 72);
		}
	},
	OtherBlock: {
		Draw: function(d) {
			d.drawSprite(this.sprite, 0, 0);
		}
	}
}