'use strict';
var getPixels = require('get-pixels');
var savePixels = require('save-pixels');
var fs = require('fs');

var tmp = fs.createWriteStream('tmp.jpg');

var srcFile = 'images/src.jpg';

function intBlack(i) {
    return i < 100;
}

function processImage(imgPath) {
    getPixels(imgPath, function(err, pixels) {
        if (err) {
            throw err;
        }
        function getRGB(x, y) {
            return (pixels.get(x, y, 0) + pixels.get(x, y, 1) + pixels.get(x, y, 2)) / 3 | 0;
        }
        function dropY(x, maxY) {
            var y = 0;
            for (; y < maxY; y++) {
                if (intBlack(getRGB(x, y))) {
                    return y;
                }
            }
            return -1;
        }
        function dropX(y, maxX) {
            var x = 0;
            for (; x < maxX; x++) {
                if (intBlack(getRGB(x, y))) {
                    return x;
                }
            }
            return -1;
        }

        var width = pixels.shape[0];
        var height = pixels.shape[1];

        var top = [];

        for (var x = 0; x < width; x++) {
            let y = dropY(x, height);
            if (y !== -1) {
                pixels.set(x, y, 0, 255);
                pixels.set(x, y, 1, 0);
                pixels.set(x, y, 2, 0);
                pixels.set(x, y, 3, 0);
            }
        }
        for (var y = 0; y < height; y++) {
            let x = dropX(y, width);
            if (x !== -1) {
                pixels.set(x, y, 0, 255);
                pixels.set(x, y, 1, 0);
                pixels.set(x, y, 2, 0);
                pixels.set(x, y, 3, 0);
            }
        }

        savePixels(pixels, 'jpeg').pipe(tmp);

    });
}

processImage(srcFile);