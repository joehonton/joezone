//=============================================================================
//
// File:         joezone/src/expect.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 13, 2015
// Contents:     Explicit type checking 
//
//=============================================================================

export default class Expect {
	
    constructor() {
    }
    
	//^ Check to make sure the given argument is of the expected type, and write an entry when it's not
	//> obj is the object to check
	//> type is a string containing a prototype.name to validate against
	//> message to display if expectation not met
	//< true if the expectation was met, false if not
	check(obj, type, message) {
		if (message == undefined) message = '';
		
		if (obj === undefined) {
			if (type == 'undefined')
				return true;
			else {
				process.stderr.write(`[*EXPECT*]${this.getStack(4)} Expected type '${type}', but got 'undefined' ${message}\n`);
				return false;
			}
		}
		if (obj === null) {
			if (type == 'null')
				return true;
			else {
				process.stderr.write(`[*EXPECT*]${this.getStack(4)} Expected type '${type}', but got 'null' ${message}\n`);
				return false;
			}
		}
			
		if (obj.constructor.name != type) {
			process.stderr.write(`[*EXPECT*]${this.getStack(4)} Expected type '${type}', but got '${obj.constructor.name}' ${message}\n`);
			return false;
		}
		return true;
	}
	
	
	//^ Take a snapshot of the stack and return the line number of the zero-indexed item in it
	getStack(depth) {
		// create an Error object, but don't throw it
		var stackTraceLine = (new Error).stack.split("\n")[depth];
		
		// extract the function name from the backtrace (assuming the backtrace pattern adopted by "node")
		var regex1 = /at (.*) ?\(/g;
		var matches = regex1.exec(stackTraceLine);
		var desiredOutput = '';
		if (matches.length > 1)
			desiredOutput += matches[1].trim();
		desiredOutput = this.rightAlign(desiredOutput);
		return `{${desiredOutput}}`;
	}
}


/*
expect( [], 'Array');
expect( {}, 'Object');
expect( '', 'String');
expect( new Date(), 'Date');
expect( 1, 'Number');
expect( function () {}, 'Function');
expect( /test/i, 'RegExp');
expect( true, 'Boolean');
expect( null, 'null');
expect( undefined, 'undefined');
*/