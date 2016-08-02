const COLUMNS = 8
const ROWS = 4
const SPACINGWIDTH = 190
const SPACINGHEIGHT = 160
const OFFSETWIDTH = 10
const OFFSETHEIGHT = 25

var getPixels = require("get-pixels")

getPixels("images/encoded.jpg", function(err, pixels) {
	if(err) {
		console.log("Bad image path")
		return
		}
	console.log("pixel is", (withinLimit(pixels.get(570, 182, 0)) ? "black" : "white"))
	scan(pixels)
})

function withinLimit(colourcode) {
	if(colourcode > 128) {
		return false
	} else {
		return true
	}
}

function scan(pixels) {
	var imageWidth = pixels.shape[0]
	var imageHeight = pixels.shape[1]
	console.log(imageWidth, imageHeight)
}
