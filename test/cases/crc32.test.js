//=============================================================================
// File:         joezone/test/cases/crc32.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2017
// License:      CC-BY-NC-ND 4.0
// Initial date: Mar 26, 2017
//=============================================================================

// @common
import CRC32 			from '../../src/crc32.class';
import Log				from '../../src/log.class';
import Text				from '../../src/text.class';
import aver				from '../../src/aver.function';
var log = new Log();

// @using initialize
var crc32 = new CRC32();

// @testing initialize
// see https://github.com/brianloveswords/buffer-crc32/blob/master/index.js
;; crc32.table.length == 256;
;; Text.format32hex(crc32.table[0]) == '00000000';					
;; Text.format32hex(crc32.table[1]) == '77073096';					
;; Text.format32hex(crc32.table[2]) == 'ee0e612c';					
;; Text.format32hex(crc32.table[3]) == '990951ba';					

;; Text.format32hex(crc32.table[252]) == 'b40bbe37';					
;; Text.format32hex(crc32.table[253]) == 'c30c8ea1';					
;; Text.format32hex(crc32.table[254]) == '5a05df1b';					
;; Text.format32hex(crc32.table[255]) == '2d02ef8d';					


// @using strings
var crc32 = new CRC32();
var dataLen = s.length;
var sData = new Buffer(dataLen);

for (let i=0; i < dataLen; i++) {
	var char = s[i];
	sData[i] = char.charCodeAt(0);
}
crc32.partialCRC(sData, dataLen);
var number = crc32.getResult();
var hex = Text.format32hex(number);

// @testing strings
var s = '';										;; hex == '00000000' // && pkzip == '00000000'
var s = 'hey sup bros';							;; hex == '47fa5570' // && pkzip == '7055fa47'
var s = 'IEND';									;; hex == 'ae426082' // && pkzip == '826042ae'
var s = 'abcdefghijklmnopqrstuvwxyz';			;; hex == '4c2750bd' // && pkzip == 'bd50274c'

	
// @using files
var result = 0;
var fixtureDir = '/musings/joezone/test/fixtures/zip-tests/';
var crc32 = new CRC32();
if (crc32.computeFileCRC(fixtureDir + file) == true)
	result = crc32.getResult();
var hex = Text.format32hex(result);

// @testing files
var file = 'abc1.txt';							;; hex == '4c2750bd' //result == 'bd50274c'
var file = 'pkzip.jpg';							;; hex == '27f2f107' //result == '07f1f227'
var file = 'missing';							;; hex == '00000000'
	