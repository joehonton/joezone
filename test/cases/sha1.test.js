//@using SHA1 checksum
import SHA1 from '../../src/sha1.class';
import Pfile from '../../src/pfile.class';

var sha1 = new SHA1();
checksum1 = sha1.checksum(new Pfile("test/input/utf8-codepoints"));

//@testing input/utf8-codepoints == output/utf8-codepoints 
var checksum1;						;; checksum1 == "24b13d2ef3b0996646000ff94f5463b41f504487"