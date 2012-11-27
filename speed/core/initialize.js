var CBuffer = require('../../cbuffer'),
    test = require('../test');

test('Empty     ', function () {
	new CBuffer(4);
});

test('Arguments ', function () {
	new CBuffer(1,2,3,4);
});

test('No new    ', function () {
	CBuffer(4);
});

test('No new arr', function () {
	CBuffer(1,2,3,4);
});

test('Array     ', function () {
	new Array();
});
