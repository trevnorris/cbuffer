var vows = require('vows');
var assert = require('assert');
var suite = vows.describe('some');

require('../env.js');

suite.addBatch({
  'some' : {
    'topic' : function () {
      return CBuffer;
    },
    'some' : function (CBuffer) {
      var tmp;

      // TODO: first need to finish some implementation
    }
  }
});

suite.export(module);
