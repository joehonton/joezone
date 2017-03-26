//=============================================================================
//
// File:         joezone/src/text-writer.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 10, 2015
// Contents:     Class for writing text files one line at a time
//
//=============================================================================

import FS from 'fs';
import Log from './log.class';
import expect from './expect.function';

export default class TextWriter {
		
    constructor() {
    	this.isStream = false;
    	this.fd = null;								// file descriptor from open()
    	Object.seal(this);
    }
    
    //< returns true or false
    open(filename) {
    	expect(filename, 'String');
    	try {
    		if (filename == 'stdout')
    			this.isStream = true;
    		else
    			this.fd = FS.openSync(filename, 'w');
   			return true;
    	} catch (e) {
    		log.abnormal(e.message);
    		return false;
    	}
    }
    
    isOpen() {
    	if (this.isStream)
    		return true;
    	else
    		return (this.fd != null);
    }
    
    close() {
    	if (!this.isOpen())
    		return;
    	
    	try {
    		if (this.isStream)
    			return;
    		else {
    			this.fd = FS.closeSync(this.fd);
    			this.fd = null;
    		}
    	} catch (e) {
    		log.abnormal(e.message);
   			this.fd = null;
    	}
    }

    //^ Write a sequence of chars
    puts(s) {
    	expect(s, 'String');
    	if (!this.isOpen())
    		return null;
    	
    	try {
    		if (this.isStream)
    			process.stdout.write(s);
    		else
    			FS.writeSync(this.fd, s);
    	} catch (e) {
    		log.abnormal(e.message);
    	}
    }
    
    //^ Write a line of text adding a linefeed at the end
    putline(line) {
    	this.puts(line + "\n");
    }
}

