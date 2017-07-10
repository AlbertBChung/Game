window.onload = function() {
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

    function preload () {
        game.load.image('map2', '/img/map2.png'); // '../../public/img/map1.png'
        game.load.image('hero', '/img/mc.png');
        game.load.tilemap('tilemap', '/img/tileMap.csv');
        game.load.image('tileset', '/img/mc.png')

    }
var player;
var cursors;

    function create () {

    game.add.tileSprite(0, 0, 3200, 2400, 'map2');

    game.world.setBounds(0, 0, 3200, 2400);


    //player physics properties
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //creates the hero
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'hero');
    player.anchor.set(0.5);
    player.width = 50;
    player.height = 50;


    game.physics.arcade.enable(player);


    //The controls.
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player);
    game.input.keyboard.addCallbacks(this, undefined, up, undefined);


    }



    function update(){


    }






















    var time;
    var pressTime = 0;
    var unpressTime = 0;
    var holding = true;

    function up(e){
    	unpressTime = new Date().getTime();
    	holding = false;
    	pressTime = 0;
    	console.log('up')
    }

    function turn(dir){
    	console.log(dir);
    }

    function moveLeftBlock(){
			console.log("left moving");
			player.body.moveTo(200,50,180);
			time = new Date().getTime();

			cursors.left.isDown = false;
			game.input.keyboard.enabled = false;
    }

    function update23(){
    	var currTime = new Date().getTime();

	    if(!game.input.keyboard.enabled &&  currTime - time > 200){
	    	game.input.keyboard.enabled = true;
	    }

			if (cursors.left.isDown)
			{	
				turn(" turning left");
				if(pressTime == 0){
					pressTime = new Date().getTime();
					holding = true;
					console.log('new time')
				}
				console.log('TIME DIFFERENCE:' + (currTime - pressTime))
				if( currTime - pressTime > 1000){
					console.log('time to check' + holding)
					if(holding){
						moveLeftBlock();
					}
				}
			}
			if (cursors.right.isDown && game.input.keyboard.enabled)
			{
				player.body.moveTo(200,50,0);
				time = new Date().getTime();

				cursors.right.isDown = false;
				game.input.keyboard.enabled = false;
				console.log("right pressed");
			}
			if (cursors.up.isDown && game.input.keyboard.enabled)
			{
				player.body.moveTo(200,50,270);
				time = new Date().getTime();

				cursors.up.isDown = false;
				game.input.keyboard.enabled = false;
				console.log("up pressed");
			}
			if (cursors.down.isDown && game.input.keyboard.enabled)
			{
				player.body.moveTo(200,50,90);
				time = new Date().getTime();

				cursors.down.isDown = false;
				game.input.keyboard.enabled = false;
				console.log("down pressed");
			}



    }


    function update2(){
    if(!game.input.keyboard.enabled && new Date().getTime() - time > 100){
    	game.input.keyboard.enabled = true;
    	player.body.stopVelocity = true;
    }

    if (cursors.up.isDown && game.input.keyboard.enabled)
    {			
			player.body.moveTo(100, 50, Phaser.ANGLE_UP);
  		cursors.up.isDown = false;
  		game.input.keyboard.enabled = false;
			time = new Date().getTime();
    }
    else if (cursors.down.isDown && game.input.keyboard.enabled)
    {
			player.body.moveTo(100, 50, Phaser.ANGLE_DOWN);
  		cursors.down.isDown = false;
  		game.input.keyboard.enabled = false;
			time = new Date().getTime();
    }

    if (cursors.left.isDown && game.input.keyboard.enabled)
    {
			player.body.moveTo(100, 50, Phaser.ANGLE_LEFT);
  		cursors.left.isDown = false;
  		game.input.keyboard.enabled = false;
  		time = new Date().getTime();
    }
    else if (cursors.right.isDown && game.input.keyboard.enabled)
    {
			player.body.moveTo(100, 50, Phaser.ANGLE_RIGHT);
  		cursors.right.isDown = false;
  		game.input.keyboard.enabled = false;
  		time = new Date().getTime();
    }

		}

		function render(){
			game.debug.cameraInfo(game.camera, 32, 32);
    	game.debug.spriteCoords(player, 32, 500);
		}

};
