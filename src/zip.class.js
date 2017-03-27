//=============================================================================
//
// File:         joezone/src/zip.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2017
// License:      CC-BY-NC-ND 4.0
// Initial date: Mar 25, 2017
// Contents:     Zip file creator
//=============================================================================

import expect from './expect.function';

class LocalFileHeader {

    constructor() {
    	// Little Endian
    	this.signature = '\x50\x4b\x03\x04';			// PK--
    	this.version = '\x14\x00';						// version 2.0
    	this.flags = '\x00\x00';						// no encryption, compression, data descriptor, language encoding, masked header values
    	this.compressionMethod = '\x00\x00';			// no compression
    	this.fileModificationTime = '\x00\x00';			// bits 00-04 = seconds/2, bits 05-10 = minutes, bits 11-15 = hours
    	this.fileModificationDate = '\x00\x00';			// bits 00-04 = day, bits 05-08 = month, bits 09-15 = year from 1980
    	this.crc32Checksum = 							// value computed over file data by CRC-32 algorithm with 'magic number' 0xdebb20e3 (little endian)
    }


}

export default class Zip {
		
    constructor() {
    }

    create(filename) {
    	expect(filename, 'String');
    }
    
    addFile(filename) {
    	expect(filename, 'String');
    }
    
    close() {
    }
}