window.onload = function() {
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

	function preload () {
		game.load.image('map1', '/img/map1.png'); // '../../public/img/map1.png'
	}

	var camera = new Phaser.Camera(game, 0 , 400, 300, 100, 50);
	function create () {
		var map = game.add.sprite(game.world.centerX, game.world.centerY, 'map1');
		map.anchor.setTo(0.5, 0.5);
	}


	function update(){

	}

};
