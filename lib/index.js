var Canvas = require('canvas'),
    fs = require('fs');

function getCanvasImageData(imageBuffer, callback) {
    var canvasImage = new Canvas.Image();

    canvasImage.onerror = callback;
    canvasImage.onload = function () {
        var context = new Canvas(canvasImage.width, canvasImage.height).getContext('2d');
        context.drawImage(canvasImage, 0, 0);
        callback(null, context.getImageData(0, 0, canvasImage.width, canvasImage.height).data);
    };
    canvasImage.src = imageBuffer;
}

function histogram(imageBuffer, callback) {
    getCanvasImageData(imageBuffer, function (err, data) {
        if (err) {
            callback(err);
        }

        var hist = {
                red: new Array(256),
                green: new Array(256),
                blue: new Array(256),
                alpha: new Array(256),

                colors: {
                    rgb: 0,
                    rgba: 0
                },

                pallettes: {
                    rgb: [],
                    rgba: []
                },

                greyscale: true,
                alphachannel: false
            },
            red,
            green,
            blue,
            alpha,
            hexmap = {},
            hexamap = {},
            i;

        for (i = 0; i < 256; i += 1) {
            hist.red[i] =
            hist.green[i] =
            hist.blue[i] =
            hist.alpha[i] = 0;
        }

        for (i = 0; i < data.length; i += 4) {
            red   = data[i];
            green = data[i + 1];
            blue  = data[i + 2];
            alpha = data[i + 3];

            if (alpha < 255) {
                hist.alphachannel = true;
            }

            if (hist.greyscale && red !== green || red !== blue) {
                hist.greyscale = false;
            }

            hist.red[red]     += 1;
            hist.green[green] += 1;
            hist.blue[blue]   += 1;
            hist.alpha[alpha] += 1;

            var hexaString = (red * 0x1000000 + green * 0x10000 + blue * 0x100 + alpha).toString(16),
                hexa  = '#' + ('0000000'.substr(0, 8 - hexaString.length)) + hexaString,
                hex = hexa.substr(0, 7);

            if (!(hex in hexmap)) {
                hexmap[hex] = 1;
                hist.pallettes.rgb.push(hex);
                hist.colors.rgb += 1;
            } else {
                hexmap[hex] += 1;
            }

            if (!(hexa in hexamap)) {
                hexamap[hexa] = 1;
                hist.pallettes.rgba.push(hexa);
                hist.colors.rgba += 1;
            } else {
                hexamap[hexa] += 1;
            }

        }

        callback(null, hist);
    });
}

module.exports = histogram;
