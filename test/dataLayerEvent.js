const assert = require('assert');

// eslint-disable-next-line no-global-assign
window = {};
window.dataLayer = [];

let fn = require('../src/lib/events/dataLayerEvent');

describe('dataLayer Event', function() {
  describe('#module.extends()', function() {
    it('function should be populated', function() {
      assert.ok(fn);
    });

    it('module.exports should be function', function() {
      assert.equal('function', typeof fn);
    });

    it('event should be registered', function() {

      // eslint-disable-next-line no-global-assign
      window = {};
      window.dataLayer = [];

      fn({
        event: 'bob'
      }, function() {

      });
      assert.equal(1, window.dataLayer.length);
      assert.equal('bob', window.dataLayer[0].on);
    });


    it('handler should be executable', function() {

      // eslint-disable-next-line no-global-assign
      window = {};
      window.dataLayer = [];

      let expected = true;
      let actual = null;
      fn({
        event: 'bob'
      }, function(event) {
        actual = event;
      });
      window.dataLayer[0].handler(expected);
      assert.equal(expected, actual);
    });

    it('lack of dataLayer should not cause failure', function() {

      // eslint-disable-next-line no-global-assign
      window = {};
      window.dataLayer = null;

      fn({
        event: 'bob'
      }, function() {

      });
    });


  });
});
