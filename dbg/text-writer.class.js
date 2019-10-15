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

var FS = require('fs');
var terminal = require('./terminal.namespace.js');
var expect = require('./expect.function.js');
var BinaryWriter = require('./binary-writer.class.js');

module.exports = class TextWriter extends BinaryWriter {
		
    constructor() {
    	super();
    	this.isStream = false;
    	Object.seal(this);
    }
    
    //> filename is a fully qualified filename or the value 'stdout'
    //< returns true or false
    open(filename) {
    	expect(filename, ['String', 'Pfile']);
    	
   		if (filename == 'stdout') {
   			this.isStream = true;
   			return true;
   		}
   		else
   			return super.open(filename);
    }
    
    isOpen() {
    	if (this.isStream)
    		return true;
    	else
    		return super.isOpen();
    }
    
    close() {
   		if (this.isStream)
   			return;
   		else
   			return super.close();
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
    	}
    	catch (e) {
    		terminal.abnormal(e.message);
    	}
    }
    
    //^ Write a line of text adding a linefeed at the end
    putline(line) {
    	this.puts(line + "\n");
    }
}

