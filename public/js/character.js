/**
* General functions for a character
*
*/
Character = function(game, name, size){
	console.log(TILE_SIZE)
	Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, name); //call sprite constructor
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

		if( this.movingup ){
  		this.y -= 1; this.dist++;
  		if(this.dist == TILE_SIZE){
  			this.dist = 0;
  			this.movingup = false;
  			this.keyboard_enabled = true;
  		}
  	}
  	if( this.movingdown ){
  		this.y += 1; this.dist++;
  		if(this.dist == TILE_SIZE){
  			this.dist = 0;
  			this.movingdown = false;
  			this.keyboard_enabled = true;
  		}
  	}
  	if( this.movingleft ){
  		this.x -= 1; this.dist++;
  		if(this.dist == TILE_SIZE){
  			this.dist = 0;
  			this.movingleft = false;
  			this.keyboard_enabled = true;
  		}
  	}
	  if( this.movingright ){
	  	this.x += 1; this.dist++;
	  	if(this.dist == TILE_SIZE){
	  		this.dist = 0;
	  		this.movingright = false;
	  		this.keyboard_enabled = true;
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



