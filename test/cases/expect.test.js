//-------------------------------------
// @common
import Expect from '../../src/expect.class';

//-------------------------------------
// @using
var expect = new Expect();
var b = expect.check(obj, type, message);

// @testing
var obj = undefined;	

var obj = []; var type = 'Array'; message = undefined;		;; b == true
// TODO HERE

expect( {}, 'Object');
expect( '', 'String');
expect( new Date(), 'Date');
expect( 1, 'Number');
expect( function () {}, 'Function');
expect( /test/i, 'RegExp');
expect( true, 'Boolean');
expect( null, 'null');
expect( undefined, 'undefined');
