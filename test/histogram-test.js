var vows = require('vows'),
    assert = require('assert'),
    histogram = require('../lib/index.js');

vows.describe('histogram').addBatch({
	'Histogram of gradient.png': {
		topic: function () {
			histogram(__dirname + '/images/gradient.png', this.callback);
		},
		'Should be greyscale': function (histogram) {
			assert.ok(histogram.greyscale);
		},
		'Should have an alpha channel': function (histogram) {
			assert.ok(histogram.alphachannel);
		},
		'Should have 256 alpha channel colors': function (histogram) {
			assert.equal(histogram.colors.rgba, 256);
		},
		'Should have 1 rgba color': function (histogram) {
			assert.equal(histogram.colors.rgb, 1);
		}
	}
})['export'](module);
