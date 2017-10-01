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

import Crypto			from  'crypto';
import expect			from './expect.function';
import Pfile			from './pfile.class';
import BinaryReader		from './binary-reader.class';
import TextReader		from './text-reader.class';

export default class SHA1 {
		
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