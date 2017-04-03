//=============================================================================
//
// File:         joezone/src/crc32.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2017
// License:      CC-BY-NC-ND 4.0
// Initial date: Mar 26, 2017
// Contents:     PKZIP CRC32
//               The CRC32B algorithm
//               For online testing see http://www.md5calc.com/ and choose "CRC32B"
//=============================================================================

import expect 		from './expect.function';
import aver 		from './aver.function';
import TextReader	from './text-reader.class';
import Pfile		from './pfile.class';

export default class CRC32 {

    constructor() {
    	this.table = new Int32Array(256);
    	this.crc = 0xffffffff;
    	this.initialize();
    }

    // precompute the lookup table for all 8-bit possibilities
    initialize() {
    	var POLYNOMIAL = 0x04C11DB7;		// per PKZIP specification
    	
		for (let i = 0; i <= 0xFF; i++) {
			this.table[i] = this.reflect(i, 8) << 24;
			for (let iPos = 0; iPos < 8; iPos++) {
				this.table[i] = (this.table[i] << 1) ^ ((this.table[i] & (1 << 31)) ? POLYNOMIAL : 0);
			}
			this.table[i] = this.reflect(this.table[i], 32);
		}
    }
    
    //> oldValue is a number in the 32 bit range 
    //> numBits is the number of bits to reflect (8 or 32)
    //< a new number in the 32 bit range
	reflect(oldValue, numBits) {
		expect(oldValue, 'Number');
		expect(numBits, 'Number');
		
		var newValue = 0;
		
		// Swap bit 0 for bit 7,  bit 1 for bit 6, ...
		// Swap bit 0 for bit 31, bit 1 for bit 30, ...
		for (let i = 1; i < (numBits + 1); i++) {
			if (oldValue & 1) {
				newValue |= (1 << (numBits - i));
			}
			oldValue >>>= 1;
		}
		
		return newValue;
	}
	
	// Call this repeatedly until finished, then call getResult() or getPkzipResult()
	//> dataBuffer buffer of 8-bit addressable values
	//> dataLen number of addressable values in buffer
	partialCRC(dataBuffer, dataLen) {
		expect(dataBuffer, 'Buffer');
		expect(dataLen, 'Number');
		
		for (let i=0; i < dataLen; i++) {
			// return (crc >>> 8) ^ this.table[(crc & 0xFF) ^ dataBuffer[i]];		// terse method

			// SHIFT-RIGHT and fill 8 left bits with 0's
			var step1 = (this.crc >>> 8);
			
			// AND the last 8 bits keeping only the 1's
			var step2 = (this.crc & 0xFF);
			
			// grab 8 bits from the data buffer
			var step3 = dataBuffer[i];
			
			// XOR the last 8 bits with the data buffer 
			var step4 = step2 ^ step3;
			aver(step4 >=0 && step4 <= 255);
			
			// the XORed result is an index from 0 to 255, use it to access the lookup table
			var step5 = this.table[step4];

			// XOR the lookup table value with the right-most 24-bits of the incoming CRC 
			this.crc = step1 ^ step5;
		}
	}
	
	//^ get the CRC of the given file's contents
	computeFileCRC(filename) {
		expect(filename, ['String', 'Pfile']);

		if (filename.constructor.name == 'String')
			filename = new Pfile(filename);
		if (!filename.exists() || !filename.isFile())
			return false;

		var tr = new TextReader(filename.name);
		if (!tr.open(filename.name))
			return false;
		
		while (tr.readBlock()) {
			this.partialCRC(tr.buffer, tr.bufferLength);
		}

		tr.close();
		return true;
	}
	
	getResult() {
		// Finalize the CRC
		var result = this.crc ^ 0xffffffff;
		return result;
	}
}

