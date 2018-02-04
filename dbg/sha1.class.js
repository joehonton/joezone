//=============================================================================
//
// File:         joezone/src/sha1.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 26, 2015
// Contents:     Compute SHA1 checksums 
//
//=============================================================================

var Crypto = require('crypto');
var expect = require('./expect.function.js');
var Pfile = require('./pfile.class.js');
var BinaryReader = require('./binary-reader.class.js');
var TextReader = require('./text-reader.class.js');

module.exports = class SHA1 {
		
    constructor() {
    	Object.seal(this);
    }
    
    checksum(pfile) {
    	expect(pfile,'Pfile');
    	
    	var crypto = Crypto.createHash('sha1');
    	
    	var tr = new TextReader();
    	tr.open(pfile.getFQN());
    	
    	var sourceline;
    	while ((sourceline = tr.getline()) != null) {
    		crypto.update(sourceline, 'utf8');
    	}
    	
    	tr.close();

    	var digest = crypto.digest('hex');
    	return digest;
    }

    checksumBinary(pfile) {
    	expect(pfile,'Pfile');
    	
    	var crypto = Crypto.createHash('sha1');
    	
    	var br = new BinaryReader();
    	br.open(pfile.getFQN());
    	
    	while (br.readBlock()) {
    		crypto.update(br.buffer);
    	}
    	
    	br.close();

    	var digest = crypto.digest('hex');
    	return digest;
    }
}
