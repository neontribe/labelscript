const SAMPLE_NUMBER = 5;

var getPixels = require("get-pixels")
var savePixels = require("save-pixels")
var im = require('imagemagick');



getPixels("images/test_4.jpg", function(err, pixels) {
	
	if(err) {
		console.log("Bad image path");
		return;
	}
	
	scan(pixels);

});

function getState(colourcode) {

	if(colourcode >= 90) {
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
	console.log(responses);
	var points = traverseAcross(pixels, colToMove[0], colToMove[1]);

	var distance = points[0] - points[1];
	var splitted = ~~(distance / 8);
	var splitted_two = ~~(distance / 10);

	var pixel_data = [];

	for(var i = 0; i < 8; i++) {
		pixel_data[i] = [];
		for(var j = 0; j < 4; j++) {
			var right = (splitted * i + points[1] + splitted / 2);
			var left = (splitted * i + points[1]);
			var mid = ~~Math.abs((right - left) * 0.5);

			var y_pos = j * splitted_two + 25 + colToMove[1] + splitted_two;

			pixel_data[i][j] = getState(getPixel(pixels, mid + left, y_pos));
			//pixel_data[i][j] = (getPixel(pixels, (right - left)*0.5 + left, y_pos));

			for(var k = 0; k < 50; k++) {
				pixels.set(left, y_pos - 30 + k, 0, 255);
				pixels.set(right, y_pos - 30 + k, 0, 255);
			}
		}
		
	}
	console.log(pixel_data);
	//savePixels(pixels, "png").pipe(process.stdout)
}

function traverseAcross(data, s_x, s_y) {
	
	let belowColour = 0;
	let tickColour = 255;
	var tick_x = s_x;
	var tick_y = s_y - 50;

	var fixed_above = s_y - 50;

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
	tick_y = s_y - 50;

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
