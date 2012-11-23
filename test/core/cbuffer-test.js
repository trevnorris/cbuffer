var vows = require('vows'),
    assert = require('assert'),
    suite = vows.describe('CBuffer'),
    und = undefined,
    view = new Int8Array(new ArrayBuffer(3));

require('../env');

suite.addBatch({
	'CBuffer' : {
		'topic' : function () {
			return CBuffer;
		},
		'construction' : function (CBuffer) {
			assert.isTrue((new CBuffer(1)) instanceof CBuffer);
			assert.isTrue(CBuffer(1) instanceof CBuffer);
			assert.isTrue((new CBuffer(1, 2, 3)) instanceof CBuffer);
			assert.isTrue(CBuffer(1, 2, 3) instanceof CBuffer);
			assert.isTrue(CBuffer(1).constructor === CBuffer);
			assert.isTrue(new CBuffer(view) instanceof CBuffer);
			assert.isTrue(CBuffer(view) instanceof CBuffer);
		},
		'data' : function (CBuffer) {
			assert.deepEqual(CBuffer(3).data, [,,]);
			assert.deepEqual(CBuffer(1, 2, 3).data, [1, 2, 3]);
			assert.deepEqual(CBuffer(view).data, view);
		},
		'end' : function (CBuffer) {
			assert.equal(CBuffer(3).end, 2);
			assert.equal(CBuffer(1, 2, 3).end, 2);
			assert.equal(CBuffer(view).end, 2);
		},
		'length' : function (CBuffer) {
			assert.equal(CBuffer(3).length, 3);
			assert.equal(CBuffer(1, 2, 3).length, 3);
			assert.equal(CBuffer(view).length, 3);
		},
		'size' : function (CBuffer) {
			assert.equal(CBuffer(3).size, 0);
			assert.equal(CBuffer(1, 2, 3).size, 3);
			assert.equal(CBuffer(view).size, 0);
		},
		'start' : function (CBuffer) {
			assert.equal(CBuffer(3).start, 0);
			assert.equal(CBuffer(1, 2, 3).start, 0);
			assert.equal(CBuffer(view).start, 0);
		}
	}
});

suite.export(module);
