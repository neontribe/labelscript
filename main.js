var getPixels = require("get-pixels")
 
getPixels("images/encoded.jpg", function(err, pixels) {
  if(err) {
    console.log("Bad image path")
    return
  }
  console.log("got pixels", pixels.get(0,0,0), )
})
