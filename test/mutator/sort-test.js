var vows = require('vows');
var assert = require('assert');
var suite = vows.describe('sort');

require('../env');

suite.addBatch({
  'sort' : {
    'topic' : function () {
      return CBuffer;
    },
    'sort items' : function (CBuffer) {
      var tmp;

      tmp = new CBuffer(7,4,5,2,1);
      tmp.sort(function(a, b) { return a - b; });
      assert.deepEqual(tmp.toArray(), [1,2,4,5,7]);

      tmp = new CBuffer('a','c','b');
      tmp.sort();
      assert.deepEqual(tmp.toArray(), ['a','b','c']);
    },
  }
});

suite.export(module);
