const COLUMNS = 8
const ROWS = 4
const SPACINGWIDTH = 190
const SPACINGHEIGHT = 160
const OFFSETWIDTH = 10
const OFFSETHEIGHT = 25

var getPixels = require("get-pixels")

getPixels("images/test_image3.jpg", function(err, pixels) {
	
	if(err) {
		console.log("Bad image path");
		return;
	}
	console.log(pixels);
	scan(pixels);

});

function getState(colourcode) {

	if(colourcode > 128) {
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
	var imageWidth = pixels.shape[0]
	var imageHeight = pixels.shape[1]


	var countX = 10;
	var countY = 5;

	var stepsX = ~~(imageWidth / countX);
	var stepsY = ~~(imageHeight / countY);



	//Take "strips" at regular intervals and average the colours.
	//Because we know that the first two strips will both be solid black we can then measure the distance between average peaks.
	var all_active_peak = 150;
					//x, y, val
	var first_peak = null;
	var second_peak = null;

	for(let i = 0; i < stepsX; i++) {
		let strip = pixels.pick(i * countX, null, null);
		let sum = 0;
		let firstHit = 0;
		for(let j = 0; j < stepsY; j++) {
			var curCol = getPixelFromStrip(strip, j * countY);

			//Get the "y" index of the first black hit on the y axis
			if(getState(curCol) == "black" && firstHit == 0) {
				firstHit = j * countY;
			}

			//add to the average sum
			sum += curCol;
		}

		//calculate the pixel colour average.
		var avg = Math.floor(sum / stepsY);


		//If the average for the row is one which indicates the whole row is made up of black squares
		if(avg < all_active_peak) {

			//If the position of the first all black row isn't known
			if(first_peak === null) {
				first_peak = [i * countX, firstHit, avg];
			} else {
				//Check in the middle of the two for white (if white then different cols)
				var xDiff = ~~(((i * countX) - first_peak[0]) * 0.5);
				var strip_sec = pixels.pick(first_peak[0] + xDiff, null, null);
				var check = getState(getPixelFromStrip(strip_sec, first_peak[1]));

				if(check == "white") {
					second_peak = [i * countX, first_peak[1], avg];
					
					//Terminate the whole loop when second match found
					j = stepsY + 1;
					i = stepsX + 1;
				}
			}
		}
	};

	// var xNear = getPixel(pixel, first_peak[0], first_peak[1]);
	// var temp_x = first_peak[0];


	// while(getState(xNear) == "black") {
	// 	xNear = getPixel(pixel)

	// }


	//Find the distance between the adjacent peaks, assume that the distance is the same for the rest of the columns.
	var distance = Math.abs(second_peak[0] - first_peak[0]);
	var offset = first_peak[1];

	var x_steps = 9;
	var y_steps = 4;

	var step_size = distance;


	for(var x = 2; x < x_steps; x += 1) {
		
		var relative_x = ~~(step_size * 1.05 * x + first_peak[0]);

		for(var y = 0; y < y_steps; y += 1) {	
			var relative_y = ~~((step_size * 1.2) * y + offset);

			var strip = pixels.pick(relative_x, null, null);
			var curCol = getPixelFromStrip(strip, relative_y);

			console.log(curCol);


		}
		console.log("BREAK")
	}
	


//	console.log(first_peak, second_peak);






	// var labelBeginCoords = [0,0];
	// var labelEndCoords = [0,0];

	// //Find the start of the label
	// var currentColour = getPixel(pixels, 0, 0);
	// var tickX = 0;
	// var tickY = 0;

	// while(getState(currentColour) == "black") {
	// 	tickY += yTickInc;
	// 	currentColour = getPixel(pixels, tickX, tickY);

	// 	if(tickY > imageHeight) {
	// 		tickX += xTickInc;
	// 		tickY = 0;
	// 	}
	// }

	// labelBeginCoords = [tickX, tickY];


	// while(getState(currentColour) == "white") {
	// 	tickX += xTickInc;
	// 	currentColour = getPixel(pixels, tickX, tickY);
	// }

	// labelEndCoords = [tickX, tickY];

	// console.log("Label found at: " + labelBeginCoords);
	// console.log("End of label found at: " + labelEndCoords);
}
