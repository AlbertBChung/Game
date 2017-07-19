/**
* General functions that are useful globally
*
*/


function doForDuration(cb, millisec){
	var currentTime = new Date().getTime();

	while (currentTime + millisec >= new Date().getTime()) {
		cb();
	}
}

function pause(millisec){

	var currentTime = new Date().getTime();

	while (currentTime + millisec >= new Date().getTime()) {}
}

function doAfter(millisec, cb){
	var currentTime = new Date().getTime();

	while (currentTime + millisec >= new Date().getTime()) {}
	cb();
}

function testlog(){
	console.log(3)
}

function initCollisionMatrix(width, height){
  let collisionMatrix = new Array(width);
  for( var i = 0; i < width; i++){
  	collisionMatrix[i] = new Array(height);
  	for(var j = 0; j < height; j++){
  		collisionMatrix[i][j] = 0;
  	}
  }


  return collisionMatrix;
}

/**
* Only for non character sprites
*/
function addSprite(game, x, y, imgKey, mustCollide, collisionMatrix){
	sprite = game.add.sprite(x, y, imgKey);
	if(mustCollide){
		for( var i = x/TILE_SIZE; i<sprite.width/TILE_SIZE+x/TILE_SIZE; i++){
			for( var j = y/TILE_SIZE; j<sprite.height/TILE_SIZE+y/TILE_SIZE-1; j++){
				collisionMatrix[i][j] = 1;
			}
		}
	}
	return sprite;
}


function logCollisionMatrix(collisionMatrix){
	console.log('____________')
	for(var i = 0; i < collisionMatrix.length; i++){
		var rowStr = '';
		for(var j = 0; j < collisionMatrix[0].length; j++){
			if(collisionMatrix)
			rowStr = '' + rowStr + collisionMatrix[j][i];
			
			if(j == collisionMatrix[0].length-1){
				console.log(rowStr + i);
			}
		}

		if(i == collisionMatrix.length-1){
			console.log('_________')
		}
	}

}