// @common
import TextWriter from '../../src/text-writer.class';

//@using open, putline, puts, close
var tw = new TextWriter();
tw.open(filename);
var isOpen = tw.isOpen();
tw.putline(textline);
tw.puts(textline);
tw.close();
var isClosed = !tw.isOpen();

//@testing simple test
var filename = "test/output/fileA"; var textline = "abcdefgh";			;; isOpen == true && isClosed == true;
var filename = "test/output/fileB"; var textline = "ABCDEFGH";			;; isOpen == true && isClosed == true;
		