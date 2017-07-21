
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
var player;
var cursors;
var map;
var layer;
var collisionMatrix; // n by m matrix where (n,m) == 1 if collides.
var TILE_SIZE = 32;

function preload () {
    game.load.image('hero', '/img/mc.png');

    game.load.spritesheet('character_animation', '/img/movement_tileset.png', 32, 32);
    game.load.tilemap('0_Town_Market', '/img/0_Town_Market.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', '/img/map_tiles.png');
    game.load.image('0_Market_Stand', '/img/sprites/0_Market_Stand.png');
    game.load.image('1_Market_Stand', '/img/sprites/1_Market_Stand.png');
    game.load.image('2_Market_Stand', '/img/sprites/2_Market_Stand.png');
    game.load.image('3_Market_Stand', '/img/sprites/3_Market_Stand.png');
    game.load.image('4_Fountain', '/img/sprites/4_Fountain.png');

}



function create () {
	game.stage.backgroundColor = "#4488AA";
  map = game.add.tilemap('0_Town_Market', TILE_SIZE, TILE_SIZE);

  map.addTilesetImage('tiles');

  layer = map.createLayer(0);

  //map.setCollisionBetween(3, 6, true, layer); 
  //map.setCollisionBetween(13, 16, true, layer);

  layer.resizeWorld();

  collisionMatrix = initCollisionMatrix(layer.layer.width, layer.layer.height);



	//player physics properties
	game.physics.startSystem(Phaser.Physics.ARCADE);

	addSprite(game, 320, 224, '0_Market_Stand', true, collisionMatrix);
  addSprite(game, 480, 224, '0_Market_Stand', true, collisionMatrix);
  addSprite(game, 640, 224, '0_Market_Stand', true, collisionMatrix);

  addSprite(game, 192, 416, '2_Market_Stand', true, collisionMatrix);
  addSprite(game, 192, 576, '2_Market_Stand', true, collisionMatrix);
  addSprite(game, 192, 704, '2_Market_Stand', true, collisionMatrix);
	addSprite(game, 416, 480, '4_Fountain', true, collisionMatrix);


	player = new Character(game, 'character_animation', TILE_SIZE, 0, 0, collisionMatrix);

	game.physics.arcade.enable([player]);
	player.body.collideWorldBounds = true;



	//The controls.
	cursors = game.input.keyboard.createCursorKeys();
  game.input.keyboard.addCallbacks(this, undefined, up, undefined);
	game.camera.follow(player);



}


function update(){
	var currTime = new Date().getTime();
	game.physics.arcade.collide(player, layer);

  player.updatePosition(currTime, collisionMatrix);


}

function render(){
	game.debug.cameraInfo(game.camera, 32, 32);
	game.debug.spriteCoords(player, 32, 500);
}


function up(e){
	player.up();
}




