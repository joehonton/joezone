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

import StackTrace from './stack-trace.class';
import use from './use.function';

//^ Check to make sure the given argument is of the expected type, and write an entry when it's not
//> obj is the object to check
//> expectedType is a string (or an array of strings) containing a prototype.name to validate against
//> message to display if expectation not met
//< true if the expectation was met, false if not
//
export default function expect(obj, expectedType, message) {
	message = use(message, '');

	var validTypes;
	if (expectedType.constructor.name == 'String') {
		if (expectOne(obj, expectedType) == true)
			return true;
	}
	else if (expectedType.constructor.name == 'Array') {
		for (let type of expectedType) {
			if (expectOne(obj, type) == true)
				return true;
		}
	}
	else {
		process.stderr.write(`[*EXPECT*] Logic: 'type' should be a String or an Array of Strings`);
		return false;
	}

	var s = '';
	if (expectedType.constructor.name == 'String')
		s = 'Expected type ' + expectedType;
	else //if (expectedType.constructor.name == 'Array')
		s = "Expected one of these types '" + expectedType.join('|') + "'";
		
	if (obj === undefined)
		process.stderr.write(`[*EXPECT*]${StackTrace.getFunctionName(3)} ${s}, but got 'undefined' ${message}\n`);
	else if (obj === null)
		process.stderr.write(`[*EXPECT*]${StackTrace.getFunctionName(3)} ${s}, but got 'null' ${message}\n`);
	else
		process.stderr.write(`[*EXPECT*]${StackTrace.getFunctionName(3)} ${s}, but got '${obj.constructor.name}' ${message}\n`);
	return false;
}

//^ A private helper to perform one object/type evaluation
//< true if obj is type; false if not
function expectOne(obj, type) {
	if (obj === undefined)
		return (type == 'undefined');
	else if (obj === null)
		return (type == 'null');
	else if (obj.constructor.name != type)
		return false;
	else
		return true;
}
