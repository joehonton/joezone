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

import expect from './expect.function';

export default class Text {
		
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
} 