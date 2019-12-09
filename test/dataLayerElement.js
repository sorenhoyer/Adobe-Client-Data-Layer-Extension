const assert = require('assert');
const jp = require('../src/lib/helpers/jsonpath');

const expected = '123';
const expr = 'test.element';

let fn = require('../src/lib/dataElements/dataLayerElement');

describe('dataLayer Element', function() {
  describe('#module.extends()', function() {
    it('function should be populated', function() {
      assert.ok(fn);
    });

    it('module.exports should be function', function() {
      assert.equal('function', typeof fn);
    });

    it('data should be returned with a non-prefixed path', function() {

      // eslint-disable-next-line no-global-assign
      window = {};
      window.dataLayer = {
        getState: function() {
          return {
            test: {
              element: expected
            }
          };
        }
      };

      let actual = fn({
        path: expr
      });
      assert.equal(expected, actual);
    });

    it('data should be returned with a prefixed path', function() {

      turbine = {};
      // eslint-disable-next-line no-global-assign
      window = {};
      window.dataLayer = {
        getState: function() {
          return {
            test: {
              element: expected
            }
          };
        }
      };
      turbine.getSharedModule = function() {
        return jp;
      };

      let actual = fn({
        path: '$.' + expr
      });
      assert.equal(expected, actual);
    });

    it('lack of dataLayer should not cause failure', function() {

      turbine = {};
      // eslint-disable-next-line no-global-assign
      window = {};
      window.dataLayer = null;
      turbine.getSharedModule = function() {
        return jp;
      };
      let actual = fn({
        path: expr
      });
      assert.equal(null, actual);
    });

  });
});
