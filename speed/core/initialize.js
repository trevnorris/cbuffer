var CBuffer = require('../../cbuffer'),
    test = require('../test'),
    view = new Uint8Array(new Buffer(4));


test('TypedArray', function () {
	new CBuffer(view);
});

test('Array     ', function () {
	new CBuffer(4);
});

test('Arguments ', function () {
	new CBuffer(1,2,3,4);
});
