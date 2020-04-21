var vows = require('vows');
var assert = require('assert');
var suite = vows.describe('map');

require('../env.js');

suite.addBatch({
  'map' : {
    'topic' : function () {
      return CBuffer;
    },
    'map' : function (CBuffer) {
      var tmp, tmp2, tmp3, tmp4;
      tmp = new CBuffer(1, 2, 3, 4);
      tmp2 = tmp.map(function timesTwo(val) { return val * 2; });
      assert.ok (tmp2 instanceof CBuffer);
      assert.equal (tmp2.get(0), 2);
      assert.equal (tmp2.get(1), 4);
      assert.equal (tmp2.get(2), 6);
      assert.equal (tmp2.get(3), 8);

      tmp3 = tmp.map(function timesI(val, i) { return val * i; });
      assert.equal (tmp3.get(0), 0);
      assert.equal (tmp3.get(1), 2);
      assert.equal (tmp3.get(2), 6);
      assert.equal (tmp3.get(3), 12);

      tmp4 = tmp.map(function timesPrevious(val, i, cbuf) { return val * cbuf.get(i - 1); });
      assert.equal (tmp4.get(0), 4);
      assert.equal (tmp4.get(1), 2);
      assert.equal (tmp4.get(2), 6);
      assert.equal (tmp4.get(3), 12);
    }
  }
});

suite.export(module);
