Histogram
=========
[![NPM version](https://badge.fury.io/js/histogram.svg)](http://badge.fury.io/js/histogram)
[![Build Status](https://travis-ci.org/Munter/node-histogram.svg?branch=master)](https://travis-ci.org/Munter/node-histogram)
[![Coverage Status](https://coveralls.io/repos/Munter/node-histogram/badge.svg)](https://coveralls.io/r/Munter/node-histogram)
[![Dependency Status](https://david-dm.org/Munter/node-histogram.svg)](https://david-dm.org/Munter/node-histogram)

Provides a histogram data structure from PNG, JPEG or GIF files using canvas.
This library works in nodejs and in any canvas supporting browser using <a href="https://raw.github.com/Munter/node-histogram/master/histogram.min.js">histogram.min.js</a>.
In the browser histogram will be available in `window.histogram`
You can also use require.js instead, keeping your global scope clean.


Example usage
-------------

NodeJS
``` javascript
var histogram = require('histogram');

histogram(fileName || Buffer, function (err, data) {
    console.log(filePath + ' has ' + data.colors.rgba + ' colors');
});
```

Browser with require.js
``` javascript
require(['path/to/histogram.min.js'], function (err, histogram) {
    histogram(URL || FileReader.result, function (data) {
        console.log(filePath + ' has ' + data.colors.rgba + ' colors');
    });
});
```

Vanilla browser
``` html
<script src="path/to/histogram.min.js"></script>
<script>
    histogram(URL || FileReader.result, function (err, data) {
        console.log(filePath + ' has ' + data.colors.rgba + ' colors');
    });
</script>
```


Data structure
--------------
``` javascript
{
    red: new Array(256), // Count of the number of times a value appears in the red channel
    green: new Array(256), // Count of the number of times a value appears in the green channel
    blue: new Array(256), // Count of the number of times a value appears in the blue channel
    alpha: new Array(256), // Count of the number of times a value appears in the alpha channel

    colors: {
        rgb: 0, // Number of unique RGB colors
        rgba: 0 // Number of unique RGBA colors
    },

    palettes: {
        rgb: [], // Array of unique colors in hex notation
        rgba: [] // Array of unique colors in hexa notation
    },

    greyscale: true, // Indicates whether all colors are greyscale or not
    alphachannel: false // Indicates that one or more pixels are translucent
}
```

License
-------
This software is licensed under the beerware license. Do whatever you want with it.
If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.
