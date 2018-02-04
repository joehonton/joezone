//=============================================================================
// File:         joezone/test/cases/text-writer.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 6, 2015
//=============================================================================

// @common
var TextWriter = require('../../../dbg/text-writer.class.js');

//@using open, putline, puts, close
var tw = new TextWriter();
tw.open(filename);
var isOpen = tw.isOpen();
tw.putline(textline);
tw.puts(textline);
tw.close();
var isClosed = !tw.isOpen();

//@testing simple test
var filename = "../test/output/fileA"; var textline = "abcdefgh";			;; isOpen == true && isClosed == true;
var filename = "../test/output/fileB"; var textline = "ABCDEFGH";			;; isOpen == true && isClosed == true;
		
