Histogram
=========

Provides a histogram data structure using canvas.


Example usage
-------------
``` javascript
histogram(fileName, function (data) {
	console.log(fileName + ' has ' + data.colors.rgba + ' colors');
});
```
fileName may be both a file path or a buffer;

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

    pallettes: {
        rgb: [], // Array of unique colors in hex notation
        rgba: [] // Array of unique colors in hexa notation
    },

    greyscale: true, // Indicates wether all colors are greyscale or not
    alphachannel: false // Indicates that one or more pixels are translucent
}
```

License
-------
This software is licensed under the beerware license. Do whatever you want with it.
If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.
