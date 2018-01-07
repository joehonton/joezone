//=============================================================================
// File:         joezone/test/cases/zip.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2017
// License:      CC-BY-NC-ND 4.0
// Initial date: Mar 25, 2017
//=============================================================================

// @common
var Zip = require('../../../dbg/zip.class.js');
var Diff = require('../../../dbg/diff.class.js');
var Pfile = require('../../../dbg/pfile.class.js');
var SHA1 = require('../../../dbg/sha1.class.js');

// @using create empty
var pfProof = new Pfile('/musings/lib/joezone/test/fixtures/zip-tests/empty-proof.zip');
var pfTrial = new Pfile('/musings/lib/joezone/test/fixtures/zip-tests/empty-trial.zip');

var zip = new Zip();
zip.create(pfTrial.name);
zip.close();
var sha1 = new SHA1();
checksum1 = sha1.checksumBinary(pfProof);
checksum2 = sha1.checksumBinary(pfTrial);
if (checksum1 == checksum2)
	FS.unlinkSync(pfTrial.name);
	
//@testing create empty
var checksum1, checksum2;						;; checksum1 == checksum2


// @using abc
var file1 = '/musings/lib/joezone/test/fixtures/zip-tests/abc1.txt';
var file2 = '/musings/lib/joezone/test/fixtures/zip-tests/abc2.txt';
var pfProof = new Pfile('/musings/lib/joezone/test/fixtures/zip-tests/abc-proof.zip');
var pfTrial = new Pfile('/musings/lib/joezone/test/fixtures/zip-tests/abc-trial.zip');

var zip = new Zip();
zip.create(pfTrial.name);
zip.addFile(file1, '');
zip.addFile(file2, '');
zip.close();
						
var sha1 = new SHA1();
checksum1 = sha1.checksumBinary(pfProof);
checksum2 = sha1.checksumBinary(pfTrial);
if (checksum1 == checksum2)
	FS.unlinkSync(pfTrial.name);

//@testing abc
var checksum1, checksum2;						;; checksum1 == checksum2


// @using こんにちは
var file3 = '/musings/lib/joezone/test/fixtures/zip-tests/こんにちは.txt';
var pfProof = new Pfile('/musings/lib/joezone/test/fixtures/zip-tests/こんにちは-proof.zip');
var pfTrial = new Pfile('/musings/lib/joezone/test/fixtures/zip-tests/こんにちは-trial.zip');

var zip = new Zip();
zip.create(pfTrial.name);
zip.addFile(file3, '');
zip.close();
var sha1 = new SHA1();
checksum1 = sha1.checksumBinary(pfProof);
checksum2 = sha1.checksumBinary(pfTrial);
if (checksum1 == checksum2)
	FS.unlinkSync(pfTrial.name);
	
//@testing こんにちは
var checksum1, checksum2;						;; checksum1 == checksum2


// @using path/to/file
var file1 = '/musings/lib/joezone/test/fixtures/zip-tests/abc1.txt';
var file2 = '/musings/lib/joezone/test/fixtures/zip-tests/abc2.txt';
var pfProof = new Pfile('/musings/lib/joezone/test/fixtures/zip-tests/path-proof.zip');
var pfTrial = new Pfile('/musings/lib/joezone/test/fixtures/zip-tests/path-trial.zip');

var zip = new Zip();
zip.create(pfTrial.name);
zip.addFile(file1, 'path/to/one');
zip.addFile(file2, 'path/to/two');
zip.close();
						
var sha1 = new SHA1();
checksum1 = sha1.checksumBinary(pfProof);
checksum2 = sha1.checksumBinary(pfTrial);
if (checksum1 == checksum2)
	FS.unlinkSync(pfTrial.name);

//@testing path/to/file
var checksum1, checksum2;						;; checksum1 == checksum2


