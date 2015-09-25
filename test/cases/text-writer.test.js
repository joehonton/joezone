// @common
import TextWriter from '../../src/text-writer.class';

//@using
var tw = new TextWriter();
tw.open(filename);
tw.putline(textline);
tw.close();

//@testing
var filename = "test/output/fileA"; var textline = "abcdefgh";			;; true
var filename = "test/output/fileB"; var textline = "ABCDEFGH";			;; true
		