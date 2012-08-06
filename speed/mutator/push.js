var CBuffer = require('../../cbuffer'),
	test = require('../test'),
	cb = new CBuffer(1e5),
	arr = new Array();

test('push 1e5 - Array  ', function() {
	var i = 1e5;
	arr.length = 0;
	while(arr.push(i), --i >= 0);
});

test('push 1e5 - CBuffer', function() {
	var i = 1e5;
	while(cb.push(i), --i >= 0);
});
