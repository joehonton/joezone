//=============================================================================
// File:         joezone/test/cases/sha1.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 26, 2015
//=============================================================================

//@using SHA1 checksum
var SHA1 = require('../../../dbg/sha1.class.js');
var Pfile = require('../../../dbg/pfile.class.js');

var sha1 = new SHA1();
checksum1 = sha1.checksum(new Pfile("test/input/utf8-codepoints"));

//@testing input/utf8-codepoints == output/utf8-codepoints 
var checksum1;						;; checksum1 == "24b13d2ef3b0996646000ff94f5463b41f504487"