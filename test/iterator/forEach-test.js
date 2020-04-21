var vows = require('vows');
var assert = require('assert');
var suite = vows.describe('forEach');

require('../env.js');

suite.addBatch({
  'forEach' : {
    'topic' : function () {
      return CBuffer;
    },
    'forEach' : function (CBuffer) {
      var tmp;

      // TODO: first need to finish forEach implementation
    }
  }
});

suite.export(module);
