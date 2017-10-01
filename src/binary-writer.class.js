//=============================================================================
//
// File:         joezone/src/binary-writer.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2017
// License:      CC-BY-NC-ND 4.0
// Initial date: Mar 27, 2017
// Contents:     Class for writing binary files 
//
//=============================================================================

import FS				from 'fs';
import Log				from './log.class';
import expect			from './expect.function';
import aver				from './aver.function';

export default class BinaryWriter {
		
    constructor() {
    	this.fd = null;								// file descriptor from open()
    	
    	if (this.constructor.name == 'BinaryWriter')
    		Object.seal(this);
    }
    
    //> filename is a fully qualified filename
    //< returns true or false
    open(filename) {
    	expect(filename, ['String', 'Pfile']);
    	if (filename.constructor.name == 'Pfile')
    		filename = filename.name;
    		
    	try {
   			this.fd = FS.openSync(filename, 'w');
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
    
    //^ Write a sequence of chars
    writeText(s) {
    	expect(s, 'String');
    	if (!this.isOpen())
    		return null;
    	
    	try {
   			FS.writeSync(this.fd, s);
    	}
    	catch (e) {
    		log.abnormal(e.message);
    	}
    }

    // write a buffer of known length
    writeBlock(buffer, bufferLength) {
    	expect(buffer, 'Buffer');
    	expect(bufferLength, 'Number');
    	
    	try {
   			FS.writeSync(this.fd, buffer, 0, bufferLength);
    	}
    	catch (e) {
    		log.abnormal(e.message);
    	}
    }
    
    // write an integer as 4-byte sequence
    writeUint32(number) {
    	expect(number, 'Number');
		aver(number < 4294967296);
		//aver(number >= 0);
    	
    	if (!this.isOpen())
    		return null;
    	
    	try {
			var buffer = new ArrayBuffer(4);
			var dataView = new DataView(buffer);
			dataView.setUint32(0, number, true);		// third parm is littleEndian
			var uint8Array = new Uint8Array(buffer);
			FS.writeSync(this.fd, uint8Array);
    	}
    	catch (e) {
    		log.abnormal(e.message);
    	}
   	}

    // write an integer as 2-byte sequence
    writeUint16(number) {
    	expect(number, 'Number');
		aver(number < 65536);
		//aver(number >= 0);
    	
    	if (!this.isOpen())
    		return null;
    	
    	try {
			var buffer = new ArrayBuffer(2);
			var dataView = new DataView(buffer);
			dataView.setUint16(0, number, true);		// third parm is littleEndian
			var uint8Array = new Uint8Array(buffer);
			FS.writeSync(this.fd, uint8Array);
    	}
    	catch (e) {
    		log.abnormal(e.message);
    	}
   	}  	
    	
    // write an integer as 1-byte sequence
    writeUint8(number) {
    	expect(number, 'Number');
		aver(number < 256);
		//aver(number >= 0);
    	
    	if (!this.isOpen())
    		return null;
    	
    	try {
			var buffer = new ArrayBuffer(1);
			var dataView = new DataView(buffer);
			dataView.setUint8(0, number, true);		// third parm is littleEndian
			var uint8Array = new Uint8Array(buffer);
			FS.writeSync(this.fd, uint8Array);
    	}
    	catch (e) {
    		log.abnormal(e.message);
    	}
   	}  	
}
