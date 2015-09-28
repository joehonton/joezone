// @common
import TextReader from '../../src/text-reader.class';

//@using open, getline, close
var tr = new TextReader();
tr.open(filename);
var isOpen = tr.isOpen();
var line = tr.getline();
tr.close();
var isClosed = !tr.isOpen();

//@testing simple
var filename = "test/input/utf8-codepoints";			;; isOpen == true && isClosed == true && line == "0000 	NUL 	SOH 	STX 	ETX 	EOT 	ENQ 	ACK 	BEL 	BS 	HT 	LF 	VT 	FF 	CR 	SO 	SI"

//TODO more	