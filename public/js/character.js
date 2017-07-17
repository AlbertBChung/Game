/**
* General functions for a character
*
*/
Character = function(game, name, size, x, y, collisionMatrix){
	Phaser.Sprite.call(this, game, x, y, name); //call sprite constructor
	collisionMatrix[x/size][y/size] = 1;


	this.animations.add('idle_down', [0,1,2,3,4], 120, true);
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
	this.gender = 'female';
	this.name = '';

	this.moveTime = 0; //time when move is initiated.
 
  this.movingup = false; //booleans to keep track if character is moving to next tile.
  this.movingdown = false; 
  this.movingright = false; 
  this.movingleft = false;

  this.dist = 0; //counter to determine when character should stop moving. i.e. when it reaches TILE_SIZE
	this.moving = false; //boolean that becomes true when key press passes the turn time threshold.
	

	this.up = function(){	
		this.moving = false;
		this.moveTime = 0;
	};

	this.updatePosition = function(currTime, collisionMatrix){
			
		if( this.movingup ){
			this.animations.play('walk_up');
  		this.y -= 4; this.dist++;
  		if(this.dist == TILE_SIZE/4){
  			this.dist = 0;
  			this.movingup = false;
  		}
  	}
  	else if( this.movingdown ){
			this.animations.play('walk_down');
  		this.y += 4; this.dist++;
  		if(this.dist == TILE_SIZE/4){
  			this.dist = 0;
  			this.movingdown = false;
  		}
  	}
  	else if( this.movingleft ){
			this.animations.play('walk_left');
  		this.x -= 4; this.dist++;
  		if(this.dist == TILE_SIZE/4){
  			this.dist = 0;
  			this.movingleft = false;
  		}
  	}
	  else if( this.movingright ){
			this.animations.play('walk_right');
	  	this.x += 4; this.dist++;
	  	if(this.dist == TILE_SIZE/4){
	  		this.dist = 0;
	  		this.movingright = false;
	  	}
	  }
	  else{
			if (cursors.up.isDown){			
		  	if(this.moveTime == 0){
			  	this.animations.play('idle_up');	
			  	this.moveTime = currTime;
		  	}
		  	else if(currTime - this.moveTime > 100){
		  		this.moving = true;
		  	}

		  	if(this.moving ){
		  		var tile = layer.getTiles(this.x, this.y-TILE_SIZE,TILE_SIZE, TILE_SIZE);
		  		if(collisionMatrix[this.x/TILE_SIZE][this.y/TILE_SIZE-1] == 0 && !tile[0].collides){
						collisionMatrix[this.x/TILE_SIZE][this.y/TILE_SIZE] = 0;
						collisionMatrix[this.x/TILE_SIZE][this.y/TILE_SIZE-1] = 1;
						this.movingup = true;
					}
		  	}
		  }
		  else if (cursors.down.isDown)
		  {
		  	
		  	if(this.moveTime == 0){
		  		this.animations.play('idle_down');	
			  	this.moveTime = currTime;
		  	}
		  	else if(currTime - this.moveTime > 100){
		  		this.moving = true;
		  	}

		  	if(this.moving){
		  		var tile = layer.getTiles(this.x, this.y+TILE_SIZE,TILE_SIZE, TILE_SIZE);
		  		if(collisionMatrix[this.x/TILE_SIZE][this.y/TILE_SIZE+1] == 0 && !tile[0].collides){
						collisionMatrix[this.x/TILE_SIZE][this.y/TILE_SIZE] = 0;
						collisionMatrix[this.x/TILE_SIZE][this.y/TILE_SIZE+1] = 1;
						this.movingdown = true;
					}
				}
		  }

		  else if (cursors.left.isDown)
		  {		
		  	if(this.moveTime == 0){
			  	this.animations.play('idle_left');
			  	this.moveTime = currTime;
		  	}
		  	else if(currTime - this.moveTime > 100){
		  		this.moving = true;
		  	}

		  	if(this.moving){
					var tile = layer.getTiles(this.x-TILE_SIZE, this.y,TILE_SIZE, TILE_SIZE);
					if(!tile[0].collides && collisionMatrix[this.x/TILE_SIZE-1][this.y/TILE_SIZE] == 0){
						collisionMatrix[this.x/TILE_SIZE][this.y/TILE_SIZE] = 0;
						collisionMatrix[this.x/TILE_SIZE-1][this.y/TILE_SIZE] = 1;
						this.movingleft = true;
					}
				}
		  }
		  else if (cursors.right.isDown)
		  {
		  	if(this.moveTime == 0){
			  	this.animations.play('idle_right');	
			  	this.moveTime = currTime;
		  	}
		  	else if(currTime - this.moveTime > 100){
		  		this.moving = true;
		  	}

		  	if(this.moving){
					var tile = layer.getTiles(this.x+TILE_SIZE, this.y,TILE_SIZE, TILE_SIZE);
					if(!tile[0].collides && collisionMatrix[this.x/TILE_SIZE+1][this.y/TILE_SIZE] ==0){
						collisionMatrix[this.x/TILE_SIZE][this.y/TILE_SIZE] = 0;
						collisionMatrix[this.x/TILE_SIZE+1][this.y/TILE_SIZE] = 1;
						this.movingright = true;
					}
				}
		  }
		  if(!cursors.up.isDown && !cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown){
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


	  }

	  
	}
}


Character.prototype = Object.create(Phaser.Sprite.prototype);
Character.prototype.constructor = Character;



