// @common
import TextReader from '../../src/text-reader.class';

//@using
var tr = new TextReader();
tr.open(filename);
var line = tr.getline();
tr.close();

//@testing
var filename = "test/input/utf8-codepoints";			;; line == "abcdefgh"
		