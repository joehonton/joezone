//=============================================================================
//
// File:         /joezone/proxy-expect.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-SA 4.0
// Initial date: Sep 13, 2015
// Contents:     This is a surrogate for the real 'expect' function for cases
//               where a class object is serialized for use over a socket and
//               the defined type is turned into an anonymous object.
//               In order to use this surrogate fuction, define a class property
//               called 'jsClassName' whose value is set in the constructor
//               to be equal to the real class name.
//
//=============================================================================

import StackTrace from './stack-trace.class';

//^ Check to make sure the given argument is of the expected type, and write an entry when it's not
//> obj is an anonymous Object to check, with a 'jsClassName' property
//> expectedType is a string containing the expected class name
//> message to display if expectation not met
//< true if the expectation was met, false if not
//
export default function proxyExpect(obj, expectedType, message) {
	message = message || '';

	var validTypes;
	if (expectedType === undefined) {
		logicMessage(`'type' should be a String or an Array of Strings, but is undefined`);
		return false;
	}
	else if (expectedType === null) {
		logicMessage(`'type' should be a String or an Array of Strings, but is null`);
		return false;
	}
	else if (expectedType.constructor.name == 'String') {
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
		logicMessage(`'type' should be a String or an Array of Strings`);
		return false;
	}

	var s = '';
	if (expectedType.constructor.name == 'String')
		s = `Expected type '${expectedType}'`;
	else //if (expectedType.constructor.name == 'Array')
		s = "Expected one of these types '" + expectedType.join('|') + "'";
		
	if (obj === undefined)
		expectMessage(`${s}, but got 'undefined' ${message}`);
	else if (obj === null)
		expectMessage(`${s}, but got 'null' ${message}`);
	else
		expectMessage(`${s}, but got '${obj.constructor.name}' ${message}`);
	return false;
}
	
//^ A private helper to perform one object/type evaluation
//< true if obj is type; false if not
function expectOne(obj, expectedType) {
	if (obj === undefined)
		expectMessage(`Expected 'Object', but got 'undefined' ${message}`);
	else if (obj === null)
		expectMessage(`Expected 'Object', but got 'null' ${message}`);
	else if (obj.constructor.name != 'Object')
		expectMessage(`Expected 'Object', but got '${obj.constructor.name}' ${message}`);
	else if (obj.jsClassName === undefined)
		expectMessage(`Expected 'jsClassName' to be a String, but got 'undefined' ${message}`);
	else if (obj.jsClassName === null)
		expectMessage(`Expected 'jsClassName' to be a String, but got 'null' ${message}`);
	else if (obj.jsClassName.constructor.name != 'String')
		expectMessage(`Expected 'jsClassName' to be a String, but got '${obj.jsClassname.constructor.name}' ${message}`);
	else if (expectedType.constructor.name != 'String')
		expectMessage(`Expected 'expectedType' to be a String, but got '${expectedType.constructor.name}' ${message}`);
	else if (obj.jsClassName != expectedType)
		expectMessage(`Expected '${expectedType}', but got '${obj.jsClassName}' ${message}`);
	else
		return true;
}

function logicMessage(message) {
	message = message || '';
	writeToConsoleOrStderr(`[*EXPECT*] Logic: ${message}\n`);
}

function expectMessage(message) {
	message = message || '';
	writeToConsoleOrStderr(`[*EXPECT*]${StackTrace.getFunctionName(4)} ${message}\n`);
}

//^ Send message to browser console or CLI stderr
function writeToConsoleOrStderr(message) {
	if (typeof console == 'object' && typeof console.warn == 'function')
		console.warn(message);
	else if (typeof process == 'object' && typeof process.stderr == 'object' && typeof process.stderr.write == 'function')
		process.stderr.write(message);
	else
		throw new Error(message);
}
