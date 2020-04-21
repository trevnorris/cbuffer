var vows = require('vows');
var assert = require('assert');
var suite = vows.describe('join');

require('../env');

suite.addBatch({
  'join': {
    topic: function() {
      return CBuffer(1, 3, 5, 7, 11);
    },
    'no arguments returns comma-separated string': function(buffer) {
      assert.equal(buffer.join(), '1,3,5,7,11');
      assert.equal(buffer.join(), [1, 3, 5, 7, 11].join());
    },
    'handles custom join string': function(buffer) {
      assert.equal(buffer.join(', '), '1, 3, 5, 7, 11');
    },
    'handles join argument that is not a string': function(buffer) {
      assert.equal(buffer.join(true), '1true3true5true7true11');
    }
  }
});

suite.export(module);
