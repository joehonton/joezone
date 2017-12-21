//=============================================================================
//
// File:         joezone/src/text-reader.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 6, 2015
// Contents:     Class for reading text files one line at a time
//
//=============================================================================

import FS				from  'fs';
import Log				from './log.class';
import expect			from './expect.function';
import BinaryReader		from './binary-reader.class';

export default class TextReader extends BinaryReader {
		
    constructor() {
    	super();
    	Object.seal(this);
    }
    
    //^ Use this to determine if it's safe to read this file as text
    //  Resets the pointer to the beginning of file afterwards so it's meaningful to use getline()
    //< returns true if this appears to be a binary file, false if it appears to be text, null if not open or an empty file
    isBinary() {
    	if (!this.isOpen())
    		return null;
    	
    	var a = this.readOctet();
    	if (a == -1)
    		return null;
    	
    	var hasZero = false;
    	var limit = 80 * 20;	// just scan the first 20 or so lines
    	while (a != -1 && limit > 0 && hasZero == false) {
        	a = this.readOctet();
    		if (a == 0x00)
        		hasZero = true;
    		limit--;
    	}
    	this.initialize();
    	return hasZero;
    }
    
    //^ get the next byte from the buffer.
    //  Automatically call readBlock when necessary
    //< returns a JavaScript Number from 0 to 255 corresponding to all possible 8-bit values
    //< returns the JavaScript Number -1 to indicate that nothing more was available
    readOctet() {    	
    	if (this.bufferOffset >= this.bufferLength) {
    		if (!this.readBlock())
    			return -1;
    	}

    	var octet = this.buffer[this.bufferOffset];
    	this.bufferOffset++;
    	return octet;
    }
       
    //^ Read a line of text from the internal buffer, stripping the trailing CRLF (Windows) or LF (Linux)
    //< returns a String, possibly empty; or a null when the end of file has been reached
    getline() {
    	if (!this.isOpen())
    		return null;
    	
    	var a = this.readOctet();
    	if (a == -1)
    		return null;			// previous call to getline() returned the last available text
    	
    	var octets = new Array();
    	while (a != -1) {
    		if (a == 0x0D) {		// CR (discard and continue)
        		a = this.readOctet();
    		}
    		else if (a == 0x0A)		// LF (discard and stop)
    			break;
    		else {
    			octets.push(a);
	    		a = this.readOctet();
    		}
    	}
    	
    	return TextReader.octetsToUtf8(octets);
    }
        
	// Originally from Masanao Izumo <iz@onicos.co.jp> Version: 1.0 (Dec 25 1999)
	//> an Array of Numbers with values from 0-255
	//< a String in UTF-8 encoding
	static octetsToUtf8(octets) {
	
		// sanity checks
		expect(octets, 'Array');
		for (let octet of octets) {
			expect(octet, 'Number');
			if (octet < 0 || octet > 255) {
				// emergency fallback
				log.invalid("The array of octets must contain number between 0 and 255");
				return octets.join('');
			}
		}
	
		var c, char2, char3, char4;
		var out = "";
		var len = octets.length;
		var i = 0;
		while (i < len) {
			c = octets[i++];
			switch(c >> 4)
			{
				case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
					// 0xxxxxxx
					// --byte1--
					out += String.fromCharCode(c);
					break;
				case 12: case 13:
					// 110x xxxx  10xx xxxx
					// --byte1--  --byte2--
					char2 = octets[i++];
					out += String.fromCharCode(
							((c & 0x1F) << 6) |
							((char2 & 0x3F) << 0));
					break;
				case 14:
					// 1110 xxxx  10xx xxxx  10xx xxxx
					// --byte1--  --byte2--  --byte3--
					char2 = octets[i++];
					char3 = octets[i++];
					out += String.fromCharCode(
							((c & 0x0F) << 12) |
						    ((char2 & 0x3F) << 6) |
						    ((char3 & 0x3F) << 0));
					break;
				case 15:
					// 1111 0xxx  10xx xxxx  10xx xxxx  10xx xxxx
					// --byte1--  --byte2--  --byte3--  --byte4--
					char2 = octets[i++];
					char3 = octets[i++];
					char4 = octets[i++];
					/* unfortunately this is not yet supported 
					out += String.fromCharCode(
							((c & 0x07) << 18) |
				            ((char2 & 0x3F) << 12) |
				            ((char3 & 0x3F) << 6) |
				            ((char4 & 0x3F) << 0));
				    */
					out += "�";
					break;
				default:
					log.invalid("Poorly formed octet array, invalid UTF-8");
					out += "�";
			}
		}
		return out;
	}
}

