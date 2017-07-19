
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
var player;
var cursors;
var map;
var layer;
var collisionMatrix; // n by m matrix where (n,m) == 1 if collides.
var TILE_SIZE = 32;
var reg = {}; //needed to create sound for typewriter
var spaceKey; // spacebar key in order to skip the typewriter function
var text; // the variable to use to reference the typewriter functions
var TextBox; // text box
function preload () {
    game.load.image('hero', '/img/mc.png');

    game.load.spritesheet('character_animation', '/img/movement_tileset.png', 32, 32);
    game.load.tilemap('0_Town_Market', '/img/0_Town_Market.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', '/img/map_tiles.png');
    game.load.image('0_Market_Stand_Top', '/img/sprites/0_Market_Stand_Top.png');
    game.load.image('0_Market_Stand_Bottom', '/img/sprites/0_Market_Stand_Bottom.png');
    game.load.image('TextBox', '/img/TextBox.png'); //text box
    game.load.image('1_Market_Stand', '/img/sprites/1_Market_Stand.png');
    game.load.image('2_Market_Stand', '/img/sprites/2_Market_Stand.png');
    game.load.image('3_Market_Stand', '/img/sprites/3_Market_Stand.png');


  game.load.json('TextRendering', '/js/TextRendering.json');
  game.load.script('Typewriter', '/js/typewriter.js')
  game.load.audio('typing', ['/sounds/Typing.mp3']);
  game.load.bitmapFont('lunchds','/fonts/lunchds/lunchds.png', 'fonts/lunchds/lunchds.fnt');

}



function create () {
	game.stage.backgroundColor = "#4488AA";
  map = game.add.tilemap('0_Town_Market', TILE_SIZE, TILE_SIZE);

  map.addTilesetImage('tiles');

  layer = map.createLayer(0);

  map.setCollisionBetween(3, 6, true, layer); 
  map.setCollisionBetween(13, 16, true, layer);

  layer.resizeWorld();

  collisionMatrix = initCollisionMatrix(layer.layer.width, layer.layer.height);



	//player physics properties
	game.physics.startSystem(Phaser.Physics.ARCADE);

	addSprite(game, 64, 64, '0_Market_Stand_Top', true, collisionMatrix);
	addSprite(game, 64, 128, '0_Market_Stand_Bottom', false)


	player = new Character(game, 'character_animation', TILE_SIZE, 0, 0, collisionMatrix);

	game.physics.arcade.enable([player]);
	player.body.collideWorldBounds = true;



	//The controls.
	cursors = game.input.keyboard.createCursorKeys();
  game.input.keyboard.addCallbacks(this, undefined, up, undefined);
	game.camera.follow(player);
  //spacebar registered
  this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 

  // typing sound created
  reg.track = game.add.audio('typing');
  //loads script
  var phaserJSON = game.cache.getJSON('TextRendering');
  //creates typewriter
  TextBox = game.add.sprite(150,430, 'TextBox');
  TextBox.fixedToCamera = true;

  text = new Typewriter();
  text.init(game, {
  x:200, 
  y:500,
  fontFamily: "lunchds",
  fontSize: 20,
  maxWidth: 500,
  sound: reg.track,
  text: "Welcome to the game " + phaserJSON.Script.name + "."
  });

  text.start();
  

}
 

function update(){
	var currTime = new Date().getTime();
	game.physics.arcade.collide(player, layer);
  

  player.updatePosition(currTime, collisionMatrix);

if (this.spaceKey.isDown)
    {
      text.skip();
    }
}

function render(){
	game.debug.cameraInfo(game.camera, 32, 32);
	game.debug.spriteCoords(player, 32, 500);
}


function up(e){
	player.up();
}



