var CBuffer = require('../../cbuffer'),
	test = require('../test'),
	cb = new CBuffer(1e5),
	arr = new Array();

test('unshift 1e5 - CBuffer', function() {
	var i = 1e5;
	cb.empty();
	while(cb.unshift(i), --i >= 0);
});

test('unshift 1e5 - Array  ', function() {
	var i = 1e5;
	arr.length = 0;
	while(arr.unshift(i), --i >= 0);
});
