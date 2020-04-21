var vows = require('vows');
var assert = require('assert');
var suite = vows.describe('CBuffer');

require('../env.js');

suite.addBatch({
  '' : {
    'topic' : function () {
      return CBuffer;
    },
    '' : function (CBuffer) {
    }
  }
});

suite.export(module);
