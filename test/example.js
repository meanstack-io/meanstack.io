/**
 * More documentation:
 *   https://mochajs.org
 *
 *  Installation:
 *    $ npm install -g mocha
 *
 *  Run:
 *    $ mocha
 *
 *
 * Chai documentation:
 *   http://chaijs.com/
 */

var assert = require('chai').assert;

describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(0, [0,1,2,3].indexOf(0));
        });
    });
});
