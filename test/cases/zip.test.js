//=============================================================================
// File:         joezone/test/cases/zip.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2017
// License:      CC-BY-NC-ND 4.0
// Initial date: Mar 25, 2017
//=============================================================================

// @common
import Zip 				from '../../src/zip.class';
import Diff				from '../../src/diff.class';
import Pfile 			from '../../src/pfile.class';

// @using
var file1 = '/musings/joezone/test/fixtures/zip-tests/abc1.txt';
var file2 = '/musings/joezone/test/fixtures/zip-tests/abc2.txt';
var pfProof = new Pfile('/musings/joezone/test/fixtures/zip-tests/xyz.zip');
var pfTrial = new Pfile('/musings/joezone/test/fixtures/zip-tests/trial.zip');

var zip = new Zip();
zip.create(pfTrial.name);
zip.addFile(file1);
zip.addFile(file2);
zip.close();

var diff = new Diff('\x1b[41m', '\x1b[0m', '\x1b[42m', '\x1b[0m');  // red/green console
var textDiff = diff.diffFiles(pfProof, pfTrial);
if (textDiff != '')
	console.log(textDiff);
if (textDiff == '')
	FS.unlinkSync(pfTrial.name);

// @testing
;; textDiff == '';
							
							