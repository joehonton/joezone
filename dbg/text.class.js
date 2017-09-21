//=============================================================================
//
// File:         joezone/src/text.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 27, 2015
// Contents:     Text manipulation
//
//=============================================================================

var expect = require('./expect.function.js');
var aver = require('./aver.function.js');

module.exports = class Text {
		
    constructor() {
    	Object.seal(this);
    }
    
    //^ Right align the given string to fit within a fixed width character column
    static rightAlign(s, width) {
    	expect(s, 'String');
    	expect(width, 'Number');

    	var columnLen = width;
    	var stringLen = s.length;
    	if (stringLen > columnLen)
    		return s.substr(0,columnLen-3) + '...';
    	else
    		return Array(columnLen+1 - stringLen).join(' ') + s;
    }

    //^ Left align the given string to fit within a fixed width character column
    static leftAlign(s, width) {
    	expect(s, 'String');
    	expect(width, 'Number');

    	var columnLen = width;
    	var stringLen = s.length;
    	if (stringLen > columnLen)
    		return s.substr(0,columnLen-3) + '...';
    	else
    		return s + Array(columnLen+1 - stringLen).join(' ');
    }
        
    //^ Truncate any string longer than maxLength using ellipse "..."
    static ellipsed(s, width) {
    	if (s != "") {
    		var ellipsis = (s.length > width) ? "..." : "";
    		s = `${s.substr(0, width)}${ellipsis}`;
    	}
    	return s;
    }
    
    //^ Count how many times the given character occurs in the given string
    static countOccurences(s, c) {
    	var count = 0;
    	for (let i=0; i < s.length; i++) {
    		if (s.charAt(i) == c)
    			count++;
    	}
    	return count;
    }
    
    static padLeft(s, width) {
    	expect(s, 'String');
    	expect(width, 'Number');
    	
    	return (s.length > width) ? s : s + " ".repeat(width - s.length);
    }

    static padRight(s, width) {
    	expect(s, 'String');
    	expect(width, 'Number');
    	
    	return (s.length > width) ? s : " ".repeat(width - s.length) + s;
    }
	
	// format the given number as a string of 32 zeros and ones
	static format32bits(number) {
		expect(number, 'Number');
		aver(number < 4294967296);
		aver(number >= -2147483648);

		var result = (number < 0 ? (0xFFFFFFFF + number + 1) : number).toString(2);
		while (result.length < 32)
			result = "0" + result;
		return result;
	}
 
	// format the given number as a string of 16 zeros and ones
	static format16bits(number) {
		expect(number, 'Number');
		aver(number < 65536);
		aver(number >= -32768);

		var result = (number < 0 ? (0xFFFF + number + 1) : number).toString(2);
		while (result.length < 16)
			result = "0" + result;
		return result;
	}
 
	// format the given number as a string of 8 zeros and ones
	static format8bits(number) {
		expect(number, 'Number');
		aver(number < 256);
		aver(number >= -128);

		var result = (number < 0 ? (0xFF + number + 1) : number).toString(2);
		while (result.length < 8)
			result = "0" + result;
		return result;
	}
 
	// format the given 32-bit number (4 bytes) as a string of 8 hexadecimal numbers
	static format32hex(number) {
		expect(number, 'Number');
		aver(number < 4294967296);
		aver(number >= -2147483648);

		var result = (number < 0 ? (0xFFFFFFFF + number + 1) : number).toString(16);
		while (result.length < 8)
			result = "0" + result;
		return result;
	}
	
	// format the given 16-bit number (2 bytes) as a string of 4 hexadecimal numbers
	static format16hex(number) {
		expect(number, 'Number');
		aver(number < 65536);
		aver(number >= -32768);

		var result = (number < 0 ? (0xFFFF + number + 1) : number).toString(16);
		while (result.length < 4)
			result = "0" + result;
		return result;
	}
	
	// format the given 8-bit number (1 byte) as a string of 2 hexadecimal numbers
	static format8hex(number) {
		expect(number, 'Number');
		aver(number < 256);
		aver(number >= -128);

		var result = (number < 0 ? (0xFF + number + 1) : number).toString(16);
		while (result.length < 2)
			result = "0" + result;
		return result;
	}
} 