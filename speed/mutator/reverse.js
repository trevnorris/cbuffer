var CBuffer = require('../../cbuffer'),
	test = require('../test'),
	cb = new CBuffer(),
	arr = new Array(),
	i;

for (i = 1e5; i > 0; i--)
	cb.push(i);

for (i = 1e5; i > 0; i--)
	arr.push(i);

test('reverse - CBuffer', function() {
	cb.reverse();
});

test('reverse - Array  ', function() {
	arr.reverse();
});
