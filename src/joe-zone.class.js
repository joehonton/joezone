//=============================================================================
//
// File:         /joezone/src/joe-zone.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 27, 2015
// Contents:     JoeZone 
//
//=============================================================================

import Log from './log.class';

export default class JoeZone {
		
    constructor() {
    	this._log = null;
    	Object.seal(this);
    }
    
    get log() {
    	if (this._log == null)
    		this._log = new Log();
    	return this._log;
    }
}