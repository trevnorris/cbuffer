var vows = require('vows');
var assert = require('assert');
var suite = vows.describe('rotateLeft');

require('../env.js');

suite.addBatch({
  'rotateLeft' : {
    'topic' : function () {
      return CBuffer;
    },
    'simple rotateLeft' : function (CBuffer) {
      assert.deepEqual(CBuffer(1, 2, 3).rotateLeft(2).toArray(), [3, 1, 2]);
      assert.deepEqual(CBuffer(1, 2, 3).rotateLeft().toArray(), [2, 3, 1]);
    }
  }
});

suite.export(module);
