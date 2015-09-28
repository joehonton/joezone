//=============================================================================
//
// File:         joezone/src/expect.function.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 13, 2015
// Contents:     Explicit type checking 
//
//=============================================================================

import Text from './text.class';
import StackTrace from './stack-trace.class';
import use from './use.function';

//^ Check to make sure the given argument is of the expected type, and write an entry when it's not
//> obj is the object to check
//> type is a string containing a prototype.name to validate against
//> message to display if expectation not met
//< true if the expectation was met, false if not
//
export default function expect(obj, type, message) {
	message = use(message, '');
	
	if (obj === undefined) {
		if (type == 'undefined')
			return true;
		else {
			process.stderr.write(`[*EXPECT*]${StackTrace.getFunctionName(4)} Expected type '${type}', but got 'undefined' ${message}\n`);
			return false;
		}
	}
	if (obj === null) {
		if (type == 'null')
			return true;
		else {
			process.stderr.write(`[*EXPECT*]${StackTrace.getFunctionName(4)} Expected type '${type}', but got 'null' ${message}\n`);
			return false;
		}
	}
		
	if (obj.constructor.name != type) {
		process.stderr.write(`[*EXPECT*]${StackTrace.getFunctionName(4)} Expected type '${type}', but got '${obj.constructor.name}' ${message}\n`);
		return false;
	}
	return true;
}
