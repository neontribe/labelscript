const SAMPLE_NUMBER = 5;

var getPixels = require("get-pixels")

getPixels("images/test_horiz.jpg", function(err, pixels) {
	
	if(err) {
		console.log("Bad image path");
		return;
	}
	console.log("LOAD");
	scan(pixels);

});

function getState(colourcode) {

	if(colourcode > 120) {
		return "white"
	} else {
		return "black"
	}

}

function getPixel(data, x, y) {
	return ~~((data.get(x, y, 0) + data.get(x, y, 1) + data.get(x, y, 2)) / 3);
}

function getPixelFromStrip(data, i) {
	return ~~((data.get(i, 0) + data.get(i, 1) + data.get(i, 2)) / 3);
}

var xTickInc = 10;
var yTickInc = 32;

function scan(pixels) {
	let imageWidth = pixels.shape[0];
	let imageHeight = pixels.shape[1];
	
	let s_x = 0;
	
	
	let scale_x = Math.floor(imageWidth / SAMPLE_NUMBER);

	//Traverse across in the y direction checking for "the line".
	var responses = [];
	for(let i = 0; i < SAMPLE_NUMBER; i++) {
		let column_info = pixels.pick(i * scale_x, null, null);
		var response = traverseDown(column_info, imageHeight);
		responses.push([i * scale_x, response]);
	}

	//TODO: Find the best column to move from


	var colToMove = responses[2];
	console.log(traverseAcross(pixels, colToMove[0], colToMove[1]));




}

function traverseAcross(data, s_x, s_y) {
	
	let belowColour = 0;
	let tickColour = 255;
	var tick_x = s_x;
	var tick_y = s_y - 20;

	var fixed_above = s_y - 20;

	var line_coords = [];

	//While we're hitting black 
	while(getState(belowColour) == "black") {
		var current_colour = getPixel(data, tick_x, tick_y);
	
		if(tick_y > s_y + 100) {
			belowColour = 255;
		}

		if(getState(current_colour) == "white") {
			tick_y++;
		} else {
			tick_x++;
			tick_y = fixed_above;
	
		}
	}
 	
 	line_coords[0] = tick_x;

 	belowColour = 0;
	tick_x = s_x;
	tick_y = s_y - 20;

	while(getState(belowColour) == "black") {
		var current_colour = getPixel(data, tick_x, tick_y);
	
		if(tick_y > s_y + 100) {
			belowColour = 255;
		}


		if(getState(current_colour) == "white") {
			tick_y++;
		} else {
			tick_x--;
			tick_y = fixed_above;
	
		}
	}

	line_coords[1] = tick_x;


	return line_coords;


	// let offset_y = 20;
	// let cur_x = 0;
	// let cur_y = 0;
	// let colour = 0;
	// let origin_x = s_x;
	// let origin_y = s_y;
	// let left_x, right_x;

	// while(!left_x) {
	// 	cur_x -= 1;
	// 	cur_y = origin_y - 25;

	// 	while(getPixel(data, cur_x, cur_y) == "black") {
	// 		if (cur_y > origin_y + 20) {
	// 			left_x = cur_x;
	// 			break;
	// 		}
	// 		else{
	// 			cur_y++;
	// 		}
	// 	}
	// }

	// while(!right_x) {
	// 	cur_x += 1;
	// 	cur_y = origin_y - 25;

	// 	while(getPixel(data, cur_x, cur_y) == "black") {
	// 		if (cur_y > origin_y + 20) {
	// 			right_x = cur_x;
	// 			break;
	// 		}
	// 		else{
	// 			cur_y++;
	// 		}
	// 	}
	// }
}


function traverseDown(data, h) {
	let downwardsColour = 0;
	let s_y = 0;
	
	while(getState(downwardsColour) == "black") {
		s_y += 1;
		downwardsColour = getPixelFromStrip(data, s_y);

		if(s_y > h) {
			return;
		}
	}

	while(getState(downwardsColour) == "white") {
		s_y += 1;
		downwardsColour = getPixelFromStrip(data, s_y);

		if(s_y > h) {
			return;
		}
	}

	return s_y;
}
