//=============================================================================
//
// File:         joezone/src/log.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 13, 2015
// Contents:     Logging using "todo | trace |normal | abnormal | invalid | security | logic | hopeless"
//
//=============================================================================

import StackTrace		from './stack-trace.class';
import Text				from './text.class';
import expect			from './expect.function';

export default class Log {
	
	// processName is an optional parameter; use it when the appplication has multiple threads or processes
    constructor(processName) {
    	expect(processName, ['String', 'undefined']);
    	
    	if (processName === undefined)
    		this.processName = '';
    	else
    		this.processName = `[${processName}]`;
    	
    	this.tag = {
			todo:      "    [TODO]",
			trace:     "   [TRACE]",
			normal:    "  [NORMAL]",
			abnormal:  "[ABNORMAL]",
			invalid:   " [INVALID]",
			security:  "[SECURITY]",
			logic:     "   [LOGIC]",
			hopeless:  "[HOPELESS]",
			exit:      "[    EXIT]"
    	};
    	
    	Object.seal(this);
    }
    
    //^ Write a note to the log
    todo(message, args) {
    	this.stderr(this.tag.todo, message, args);
    }
    
    //^ Write a breadcrumb to the log
    trace(message, args) {
    	this.stderr(this.tag.trace, message, args);
    }

    //^ Write a normal notice into the log
    normal(message, args) {
    	this.stderr(this.tag.normal, message, args);
    }
    
    //^ Write an entry when something eventful and unexpected happens, but which may be recoverable
    abnormal(message, args) {
    	this.stderr(this.tag.abnormal, message, args);
    }

    //^ Write an entry when something eventful and unexpected happens, then terminate
    abnormalHalt(message, args) {
    	this.stderr(this.tag.abnormal, message, args);
    	this.exit(303,"HALT");
    }

    //^ Write an entry when data does not conform to rules, then proceed with fallback value
    invalid(message, args) {
    	this.stderr(this.tag.invalid, message, args);
    }

    //^ Write an entry when data does not conform to rules, then terminate
    invalidHalt(message, args) {
    	this.stderr(this.tag.invalid, message, args);
    	this.exit(505,"HALT");
    }

    //^ Write an entry when a security breach may have occured, then silently proceed
    security(message, args) {
    	this.stderr(this.tag.security, message, args);
    }
    
    //^ Write an entry when a security breach may have occured, then terminate
    securityHalt(message, args) {
    	this.stderr(this.tag.security, message, args);
    	this.exit(707,"HALT");
    }
    
    //^ Write an entry when a logically impossible condition occurs, then proceed with fallback value
    logic(message, args) {
    	this.stderr(this.tag.logic, message, args);
    }

    //^ Write an entry when a logically impossible condition occurs, then terminate
    logicHalt(message, args) {
    	this.stderr(this.tag.logic, message, args);
    	this.exit(808,"HALT");
    }
    
    //^ Write an entry when recovery is impossible or unwise, then terminate
    hopelessHalt(message, args) {
    	this.stderr(this.tag.hopeless, message, args);
    	this.exit(909,"HALT");
    }
    
    //^ Exit the process with the given return code
    exit(rc, message) {
    	message = message || '';
    	expect(rc, 'Number');
    	expect(message, 'String');
    	this.stderr(this.tag.exit, rc, ` ${message}\n`);
    	process.exit(0);
    }
    
    //^ Send message to stderr
    stderr(tag, message, args) {
    	message = message || '';
    	if (message instanceof Error)
    		message = message.toString();
    	expect(message, 'String');

    	args = args || '';
    	expect(args, 'String');
    	
    	this.writeToConsoleOrStderr(`${this.processName}${tag}${StackTrace.getFunctionName(4)} ${message}${args}`);
    }
    
    stackTrace() {
		var stack = (new Error).stack.split("\n");
		for (let s of stack)
			this.trace(s);
    }
    
	//^ Send message to browser console or CLI stderr
	writeToConsoleOrStderr(message) {
		if (typeof console == 'object' && typeof console.warn == 'function')
			console.warn(message);
		else if (typeof process == 'object' && typeof process.stderr == 'object' && typeof process.stderr.write == 'function')
			process.stderr.write(message);
		else
			throw new Error(message);
	}
}






/*
    	process.stderr.write(stackTraceLines);
    	
    	if (<anonymous>:[0-9]:[0-9])
    		then look in expanded code for line number

Error
    at Log.stderr (eval at evaluate (/codebase/bequiesce/es5/test-case.class.js:122:12), <anonymous>:166:29)
    at Log.todo (eval at evaluate (/codebase/bequiesce/es5/test-case.class.js:122:12), <anonymous>:32:11)
    at eval (eval at evaluate (/codebase/bequiesce/es5/test-case.class.js:122:12), <anonymous>:175:5)
    at TestCase.evaluate (/codebase/bequiesce/es5/test-case.class.js:122:7)
    at TestCase.runTests (/codebase/bequiesce/es5/test-case.class.js:74:30)
    at TestGroup.runTests (/codebase/bequiesce/es5/test-group.class.js:43:16)
    at SituationSection.runTests (/codebase/bequiesce/es5/situation-section.class.js:68:13)
    at TestPackage.runTests (/codebase/bequiesce/es5/test-package.class.js:134:15)
    at Bequiesce.runTests (/codebase/bequiesce/es5/bequiesce.class.js:88:9)
    at CLI.execute (/codebase/bequiesce/es5/cli.class.js:45:16)    [TODO]{        eval (eval at evaluate} abcdefg
*/
