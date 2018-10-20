/*global weknowhow*/
var expect = typeof weknowhow === 'undefined' ? require('unexpected') : weknowhow.expect,
    histogram = typeof histogram === 'undefined' ? require('../lib/index.js') : histogram,
    imagePath = typeof __dirname !== 'undefined' ? __dirname + '/images/' : './images/';

describe('api', function () {
    it('should throw on invalid image buffer argument', function () {
        expect(histogram, 'to throw', function (err) {
            expect(err, 'to be a', TypeError);
            expect(err.message, 'to be', 'Expected imageBuffer to be a string or a buffer');
        });
    });

    it('should throw on missing callback argument', function () {
        expect(histogram.bind(this, 'foo'), 'to throw', function (err) {
            expect(err, 'to be a', TypeError);
            expect(err.message, 'to be', 'Expected callback to be a function');
        });
    });

    it('should return an error when given an invalid image path', function (done) {
        histogram('invalidFilePath', function (err, result) {
            expect(result, 'to be undefined');
            expect(err, 'to be a', Error);

            done();
        });
    });
});

describe('Histogram of gradient.png', function () {
    var path = imagePath + 'gradient.png';

    it('should be greyscale', function (done) {
        histogram(path, function (error, result) {
            expect(error, 'to be falsy');

            expect(result, 'to satisfy', {
                greyscale: true
            });

            done();
        });
    });

    it('should have an alpha channel', function (done) {
        histogram(path, function (error, result) {
            expect(error, 'to be falsy');
            expect(result, 'to satisfy', {
                alphachannel: true
            });

            done();
        });
    });

    it('should have 256 rgba colors', function (done) {
        histogram(path, function (error, result) {
            expect(error, 'to be falsy');
            expect(result, 'to satisfy', {
                colors: {
                    rgba: 256
                }
            });

            done();
        });
    });

    it('should have 1 rgb color', function (done) {
        histogram(path, function (error, result) {
            expect(error, 'to be falsy');
            expect(result, 'to satisfy', {
                colors: {
                    rgb: 1
                }
            });

            done();
        });
    });
});

describe('Histogram of gradient-red.png', function () {
    var path = imagePath + 'gradient-red.png';

    it('should be greyscale', function (done) {
        histogram(path, function (error, result) {
            expect(error, 'to be falsy');

            expect(result, 'to satisfy', {
                greyscale: false
            });

            done();
        });
    });

    it('should have an alpha channel', function (done) {
        histogram(path, function (error, result) {
            expect(error, 'to be falsy');

            expect(result, 'to satisfy', {
                alphachannel: true
            });

            done();
        });
    });

    it('should have 256 alpha channel colors', function (done) {
        histogram(path, function (error, result) {
            expect(error, 'to be falsy');

            expect(result, 'to satisfy', {
                colors: {
                    rgba: 256
                }
            });

            done();
        });
    });
});

describe('Histogram of cablecar.gif', function () {
    var path = imagePath + 'cablecar.gif';

    it('should not be greyscale', function (done) {
        histogram(path, function (error, result) {
            expect(error, 'to be falsy');

            expect(result, 'to satisfy', {
                greyscale: false
            });

            done();
        });
    });
});

describe('Histogram of turtle.jpg', function () {
    var path = imagePath + 'turtle.jpg';

    it('should not be greyscale', function (done) {
        histogram(path, function (error, result) {
            expect(error, 'to be falsy');

            expect(result, 'to satisfy', {
                greyscale: false
            });

            done();
        });
    });
});
