var vows = require('vows'),
    assert = require('assert')
    suite = vows.describe('CBuffer');

require('../env.js');

suite.addBatch({
	'sum' : {
		'topic' : function () {
			return CBuffer;
		},
		'Calculate sum' : function (CBuffer) {
			var tmp;
			tmp = new CBuffer(1,2,3,4);
			assert.equal (tmp.sum(),10);
		}
	},
	'avg' : {
		'topic' : function () {
			return CBuffer;
		},
		'Calculate average' : function (CBuffer) {
			var tmp;
			tmp = new CBuffer(1,2,3,4);
			assert.equal (tmp.avg(),5);
		},
		'Calculate average on zero items(devision by zero)' : function (CBuffer) {
			var tmp;
			tmp = new CBuffer();
			assert.equal (tmp.avg(),0);
		}
	}
});

suite.export(module);
