/**
* General functions for a character
*
*/
Character = function(game, name, size){
	Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, name); //call sprite constructor
	this.animations.add('idle_down', [0,1,2,3,4], 2, true);
	this.animations.add('idle_up', [10,11,12,13,14], 2, true);
	this.animations.add('idle_left', [20,21,22,23,24], 2, true);
	this.animations.add('idle_right', [30,31,32,33,34], 2, true);
	this.animations.add('walk_down', [5,6,7,8,9], 2, true);
	this.animations.add('walk_up', [15,16,17,18,19], 2, true);
	this.animations.add('walk_left', [25,26,27,28,29], 2, true);
	this.animations.add('walk_right', [35,36,37,38,39], 2, true);

	this.animations.play('idle_down')

	game.add.existing(this);
	this.width = size;
	this.height = size;

	this.moveTime = 0; //time when move is initiated.
 
  this.movingup = false; //booleans to keep track if character is moving to next tile.
  this.movingdown = false; 
  this.movingright = false; 
  this.movingleft = false;

  this.dist = 0; //counter to determine when character should stop moving. i.e. when it reaches TILE_SIZE
	this.ok_to_move = false; //boolean that becomes true when key press passes the turn time threshold.
	this.keyboard_enabled = true; //boolean that forbids movement keypress.

	this.up = function(){	
		this.ok_to_move = false;
		this.moveTime = 0;
	};

	this.updatePosition = function(currTime){

	  	console.log(this.animations.currentAnim.name)
		if( this.movingup ){
			this.animations.play('walk_up');
  		this.y -= 2; this.dist++;
  		if(this.dist == TILE_SIZE/2){
  			this.dist = 0;
  			this.movingup = false;
  			this.keyboard_enabled = true;
  		}
  	}
  	else if( this.movingdown ){
			this.animations.play('walk_down');
  		this.y += 2; this.dist++;
  		if(this.dist == TILE_SIZE/2){
  			this.dist = 0;
  			this.movingdown = false;
  			this.keyboard_enabled = true;
  		}
  	}
  	else if( this.movingleft ){
			this.animations.play('walk_left');
  		this.x -= 2; this.dist++;
  		if(this.dist == TILE_SIZE/2){
  			this.dist = 0;
  			this.movingleft = false;
  			this.keyboard_enabled = true;
  		}
  	}
	  else if( this.movingright ){
			this.animations.play('walk_right');
	  	this.x += 2; this.dist++;
	  	if(this.dist == TILE_SIZE/2){
	  		this.dist = 0;
	  		this.movingright = false;
	  		this.keyboard_enabled = true;
	  	}
	  }
	  else{

	  	switch(this.animations.currentAnim.name){
	  		case 'walk_down':
			  	this.animations.play('idle_down');
			  	break;
	  		case 'walk_right':
			  	this.animations.play('idle_right');
			  	break;
	  		case 'walk_left':
			  	this.animations.play('idle_left');
			  	break;
	  		case 'walk_up':
			  	this.animations.play('idle_up');
			  	break;

	  	}
	  }


	  if (cursors.up.isDown && this.keyboard_enabled)
	  {				
	  	if(this.moveTime == 0){
		  	this.moveTime = currTime;
	  	}
	  	else if(currTime - this.moveTime > 100){
	  		this.ok_to_move = true;
	  	}

	  	if(this.ok_to_move){
				var tile = layer.getTiles(this.x, this.y-TILE_SIZE,TILE_SIZE, TILE_SIZE);
				if(!tile[0].collides){
					cursors.up.isDown = false;
					this.keyboard_enabled = false;
					this.movingup = true;
				}
	  	}
	  }
	  else if (cursors.down.isDown && this.keyboard_enabled)
	  {
	  	if(this.moveTime == 0){
		  	this.moveTime = currTime;
	  	}
	  	else if(currTime - this.moveTime > 100){
	  		this.ok_to_move = true;
	  	}

	  	if(this.ok_to_move){
		  	this.moveTime = currTime;
				var tile = layer.getTiles(this.x, this.y+TILE_SIZE,TILE_SIZE, TILE_SIZE);
				if(!tile[0].collides){
					cursors.down.isDown = false;
					this.keyboard_enabled = false;
					this.movingdown = true;
				}
			}
	  }

	  if (cursors.left.isDown && this.keyboard_enabled)
	  {	
	  	if(this.moveTime == 0){
		  	this.moveTime = currTime;
	  	}
	  	else if(currTime - this.moveTime > 100){
	  		this.ok_to_move = true;
	  	}

	  	if(this.ok_to_move){
				var tile = layer.getTiles(this.x-TILE_SIZE, this.y,TILE_SIZE, TILE_SIZE);
				if(!tile[0].collides){
					cursors.left.isDown = false;
					this.keyboard_enabled = false;
					this.movingleft = true;
				}
			}
	  }
	  else if (cursors.right.isDown && this.keyboard_enabled)
	  {
	  	if(this.moveTime == 0){
		  	this.moveTime = currTime;
	  	}
	  	else if(currTime - this.moveTime > 100){
	  		this.ok_to_move = true;
	  	}

	  	if(this.ok_to_move){
				var tile = layer.getTiles(this.x+TILE_SIZE, this.y,TILE_SIZE, TILE_SIZE);
				if(!tile[0].collides){
					cursors.right.isDown = false;
					this.keyboard_enabled = false;
					this.movingright = true;
				}
			}
	  }
	}
}


Character.prototype = Object.create(Phaser.Sprite.prototype);
Character.prototype.constructor = Character;



