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