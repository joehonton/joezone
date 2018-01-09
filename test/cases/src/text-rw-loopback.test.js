//=============================================================================
// File:         joezone/test/cases/text-rw-loopback.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 6, 2015
//=============================================================================

// @common
import TextReader from '../../../dbg/text-reader.class';
import TextWriter from '../../../dbg/text-writer.class';

//@using TextReader and TextWriter
var tr = new TextReader();
var tw = new TextWriter();
tr.open("../test/input/utf8-codepoints");
tw.open("../test/output/utf8-codepoints");

var sourceline = tr.getline();
tw.puts(sourceline);
linecount = 1;

while ((sourceline = tr.getline()) != null) {
	tw.puts("\n");
	tw.puts(sourceline);
	linecount++;
}
tr.close();
tw.close();

//@testing simple
var linecount = 0;								;; linecount == 4217


//@using SHA1 checksum
import SHA1 from '../../../dbg/sha1.class';
import Pfile from '../../../dbg/pfile.class';
var sha1 = new SHA1();
checksum1 = sha1.checksum(new Pfile("../test/input/utf8-codepoints"));
checksum2 = sha1.checksum(new Pfile("../test/output/utf8-codepoints"));

//@testing input/utf8-codepoints == output/utf8-codepoints 
var checksum1, checksum2;						;; checksum1 == checksum2