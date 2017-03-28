//=============================================================================
//
// File:         joezone/src/binary-reader.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2017
// License:      CC-BY-NC-ND 4.0
// Initial date: Mar 27, 2017
// Contents:     Class for reading binary files using block transfer
//
//=============================================================================

import FS from 'fs';
import Log from './log.class';
import expect from './expect.function';

export default class BinaryReader {
		
    constructor() {
    	this.fd = null;								// file descriptor from open()
    	this.readSize = 8192;						// number of bytes to transfer from file to buffer with each read
    	this.buffer = new Buffer(this.readSize);	// a nodejs Buffer (an array of octets outside the V8 heap)
    	this.bufferLength = null;					// number of valid bytes in the buffer; usually readSize but less when the last block of the file is retrieved
    	this.blockOffset = null;					// block offset into file for next readBlock()
    	this.bufferOffset = null;					// byte offset into the Buffer for next readOctet()
    	Object.seal(this);
    	
    	this.initialize();
    }
    
    initialize() {
    	this.buffer.fill(0x00);
    	this.bufferLength = 0;
    	this.blockOffset = 0;
    	this.bufferOffset = 0;
    }
    
    //< returns true or false
    open(filename) {
    	expect(filename, ['String', 'Pfile']);
    	if (filename.constructor.name == 'Pfile')
    		filename = filename.name;
    	
    	try {
    		this.fd = FS.openSync(filename, 'r');
    		this.initialize();
   			return true;
    	}
    	catch (e) {
    		log.abnormal(e.message);
    		return false;
    	}
    }
    
    isOpen() {
    	return (this.fd != null);
    }
    
    close() {
    	if (!this.isOpen())
    		return;
    	
    	try {
    		this.fd = FS.closeSync(this.fd);
   			this.fd = null;
    	}
    	catch (e) {
    		log.abnormal(e.message);
   			this.fd = null;
    	}
    }
    
    //^ get the next block of bytes from the disk
    //< returns true if something was read, false if nothing more was available
    readBlock() {
    	if (!this.isOpen())
    		return false;
    	
    	try {
	    	this.buffer.fill(0x00);
	    	this.bufferLength = FS.readSync(this.fd, this.buffer, 0, this.readSize, this.blockOffset);
	    	this.blockOffset += this.bufferLength;
	    	this.bufferOffset = 0;
	    	return (this.bufferLength > 0);
    	}
    	catch(e) {
    		log.trace(e.message);
    		this.bufferLength = 0;
	    	this.bufferOffset = 0;
   			return false;
    	}
    }
}
