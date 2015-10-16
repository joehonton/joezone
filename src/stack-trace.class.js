//=============================================================================
//
// File:         joezone/src/stack-trace.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 27, 2015
// Contents:     Stack trace functions
//
//=============================================================================

//import Text from './text.class';

export default class StackTrace {
		
    constructor() {
    	Object.seal(this);
    }

	//^ Take a snapshot of the stack and return the line number of the zero-indexed item in it
	static getFunctionName(depth) {
		// create an Error object, but don't throw it
		var stackTraceLine = (new Error).stack.split("\n")[depth];
		
		// extract the function name from the backtrace (assuming the backtrace pattern adopted by "node")
		var regex1 = /at (.*) ?\(/g;
		var matches = regex1.exec(stackTraceLine);
		var desiredOutput = '';
		if (matches.length > 1)
			desiredOutput += matches[1].trim();
		desiredOutput = StackTrace.rightAlign(desiredOutput, 30);
		return `{${desiredOutput}}`;
	}

	// Can't use Text.rightAlign becuase it results in a circular require
	//^ Right align the given string to fit within a fixed width character column
    static rightAlign(s, width) {
    	var columnLen = width;
    	var stringLen = s.length;
    	if (stringLen > columnLen)
    		return s.substr(0,columnLen-3) + '...';
    	else
    		return Array(columnLen+1 - stringLen).join(' ') + s;
    }
}