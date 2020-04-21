var vows = require('vows');
var assert = require('assert');
var suite = vows.describe('pop');

require('../env');

suite.addBatch({
  'pop' : {
    'topic' : function () {
      return CBuffer;
    },
    'pop items' : function (CBuffer) {
      var tmp;

      tmp = CBuffer(1, 2, 3);
      assert.equal(tmp.pop(), 3);

      tmp = CBuffer(1, 2, 3);
      tmp.pop();
      assert.deepEqual(tmp.toArray(), [1, 2]);

      tmp = CBuffer(3);
      assert.isUndefined(tmp.pop());
    },
    'pop properties' : function (CBuffer) {
      var tmp;

      tmp = CBuffer(1, 2, 3);
      tmp.pop();
      assert.equal(tmp.end, 1);
      assert.equal(tmp.length, 2);
    },
    'over pop': function(CBuffer) {
      var tmp = CBuffer(5);
      tmp.push(4, 5, 6, 7, 8, 9, 10);
      assert.equal(tmp.pop(), 10);
      assert.equal(tmp.end, 0);
      assert.equal(tmp.start, 2);
      assert.equal(tmp.length, 4);
    },
  }
});

suite.export(module);
