//=============================================================================
//
// File:         joezone/src/aver.function.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2016
// License:      CC-BY-NC-ND 4.0
// Initial date: Dec 30, 2016
// Contents:     Log a message when a statement does not evaluate to true.
//               A type of soft assertion, for sanity checking.
//
//=============================================================================

import expect	  from './expect.function';
import StackTrace from './stack-trace.class';

//^ Log a message when a statement does not evaluate to true
//> statement is a boolean when it reaches this function.  It is an expression when written byt the caller.
//> message to display if the statement is not true
//< true if the statement is true, false if the statement is false
//
export default function aver(statement, message) {
	message = message || '';

	if (statement === undefined)
		process.stderr.write(`[* AVER *]${StackTrace.getFunctionName(3)} Expected boolean, but got 'undefined' (${message})\n`);
		
	else if (statement === null)
		process.stderr.write(`[* AVER *]${StackTrace.getFunctionName(3)} Expected boolean, but got 'null' (${message})\n`);
		
	else if (statement.constructor.name != 'Boolean')
		process.stderr.write(`[* AVER *]${StackTrace.getFunctionName(3)} Expected boolean, but got '${statement.constructor.name}' (${message})\n`);
	
	else if (statement === false)
		process.stderr.write(`[* AVER *]${StackTrace.getFunctionName(3)} Unable to aver ${StackTrace.getSitus(3)} (${message})\n`);

	else if (statement === true)
		return true;

	return false;
}
