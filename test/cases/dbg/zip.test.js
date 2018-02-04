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

var fixtureDir = '../test/fixtures/zip-tests/';			// relative to CWD: /palau/lib/joezone/pro

// @using create empty
var pfProof = new Pfile(fixtureDir + 'empty-proof.zip');
var pfTrial = new Pfile(fixtureDir + 'empty-trial.zip');

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
var file1 = fixtureDir + 'abc1.txt';
var file2 = fixtureDir + 'abc2.txt';
var pfProof = new Pfile(fixtureDir + 'abc-proof.zip');
var pfTrial = new Pfile(fixtureDir + 'abc-trial.zip');

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
var file3 = fixtureDir + 'こんにちは.txt';
var pfProof = new Pfile(fixtureDir + 'こんにちは-proof.zip');
var pfTrial = new Pfile(fixtureDir + 'こんにちは-trial.zip');

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
var file1 = fixtureDir + 'abc1.txt';
var file2 = fixtureDir + 'abc2.txt';
var pfProof = new Pfile(fixtureDir + 'path-proof.zip');
var pfTrial = new Pfile(fixtureDir + 'path-trial.zip');

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


