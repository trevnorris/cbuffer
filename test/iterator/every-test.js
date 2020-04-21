var vows = require('vows');
var assert = require('assert');
var suite = vows.describe('every');

require('../env.js');

suite.addBatch({
  'every' : {
    'topic' : function () {
      return CBuffer;
    },
    'every items ok' : function (CBuffer) {
      var tmp;

      tmp = new CBuffer(1,2,3,4);
      assert.ok(tmp.every(function (a) {
        return ~~a === a;
      }));
    },
    'every items error' : function (CBuffer) {
      var tmp;

      tmp = new CBuffer(1,2,3,4);
      assert.ok(tmp.every(function (a) {
        return a <= 4;
      }));
    },
  }
});

suite.export(module);
