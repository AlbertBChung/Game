
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
var player;
var cursors;
var map;
var layer;
var TILE_SIZE = 16;

function preload () {
    game.load.image('hero', '/img/mc.png');


    game.load.tilemap('map', '/img/tileMap.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', '/img/tileset.png');


}



function create () {
	game.stage.backgroundColor = "#4488AA";
  map = game.add.tilemap('map', TILE_SIZE, TILE_SIZE);
  map.addTilesetImage('tiles');
  map.setCollisionBetween(0, 7, true, layer);

  layer = map.createLayer(0);
  layer.resizeWorld();


	//player physics properties
	game.physics.startSystem(Phaser.Physics.ARCADE);



	player = new Character(game, 'hero', TILE_SIZE);

	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;




	//The controls.
	cursors = game.input.keyboard.createCursorKeys();
  game.input.keyboard.addCallbacks(this, undefined, up, undefined);
	game.camera.follow(player);



}


function update(){
	var currTime = new Date().getTime();
	game.physics.arcade.collide(player, layer);

  player.updatePosition(currTime);


}

function render(){
	game.debug.cameraInfo(game.camera, 32, 32);
	game.debug.spriteCoords(player, 32, 500);
}


function up(e){
	player.up();
}




