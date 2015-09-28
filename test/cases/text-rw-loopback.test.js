// @common
import TextReader from '../../src/text-reader.class';
import TextWriter from '../../src/text-writer.class';

//@using TextReader and TextWriter
var tr = new TextReader();
var tw = new TextWriter();
tr.open("test/input/utf8-codepoints");
tw.open("test/output/utf8-codepoints");

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
import SHA1 from '../../src/sha1.class';
import Pfile from '../../src/pfile.class';
var sha1 = new SHA1();
checksum1 = sha1.checksum(new Pfile("test/input/utf8-codepoints"));
checksum2 = sha1.checksum(new Pfile("test/output/utf8-codepoints"));

//@testing input/utf8-codepoints == output/utf8-codepoints 
var checksum1, checksum2;						;; checksum1 == checksum2