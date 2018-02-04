//=============================================================================
// File:         joezone/test/cases/text-reader.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 6, 2015
//=============================================================================

// @common
var TextReader = require('../../../dbg/text-reader.class.js');

//@using open, getline, close
var tr = new TextReader();
tr.open(filename);
var isOpen = tr.isOpen();
var line = tr.getline();
tr.close();
var isClosed = !tr.isOpen();

//@testing simple
var filename = "../test/input/utf8-codepoints";			;; isOpen == true && isClosed == true && line == "0000 	NUL 	SOH 	STX 	ETX 	EOT 	ENQ 	ACK 	BEL 	BS 	HT 	LF 	VT 	FF 	CR 	SO 	SI"

//TODO more	
