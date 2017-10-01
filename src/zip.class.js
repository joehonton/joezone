//=============================================================================
//
// File:         joezone/src/zip.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2017
// License:      CC-BY-NC-ND 4.0
// Initial date: Mar 25, 2017
// Contents:     Zip file creator
//               Caution: local file headers are in Little Endian format
//=============================================================================

import FS				from  'fs';
import expect			from './expect.function';
import Pfile			from './pfile.class';
import CRC32			from './crc32.class';
import BinaryReader		from './binary-reader.class';
import BinaryWriter		from './binary-writer.class';
import Log				from './log.class';

class CentralDirectoryRecord {
	
	constructor() {
		this.numberOfThisDisk = 0;							// (2)
		this.diskWhereCDRStarts = 0;						// (2)
		this.numberOfCDRthisDisk = 0;						// (2)
		this.totalNumberOfCDR = 0;							// (2)
		this.sizeOfCentralDirectory = 0;					// (4)
		this.offsetOfStartOfCentralDirectory = 0;			// (4)
		this.commentLength = 0;								// (2)
		this.comment = null;
		
    	Object.seal(this);
	}
	
	// end of central directory record
	writeEnd(bw) {
		expect(bw, 'BinaryWriter');
		
		bw.writeUint32(0x06054b50);							// signature
		bw.writeUint16(this.numberOfThisDisk);
		bw.writeUint16(this.diskWhereCDRStarts);
		bw.writeUint16(this.numberOfCDRthisDisk);
		bw.writeUint16(this.totalNumberOfCDR);
		bw.writeUint32(this.sizeOfCentralDirectory);
		bw.writeUint32(this.offsetOfStartOfCentralDirectory);
		bw.writeUint16(this.commentLength);
	}
}

class LocalFileHeader {

   	//> filename is the fully qualified filename
	//> path is a directory path to prepend to the bare filename obtained from the first argument,
	//   so the name written to the local file header will be path + filename.getFilename()
   	//> relativeOffset is the number of bytes written to the archive before this header
    constructor(filename, path, relativeOffset) {
    	expect(filename, ['Pfile', 'String']);
    	expect(path, ['Pfile', 'String']);
    	expect(relativeOffset, 'Number');
    	
    	if (filename.constructor.name == 'String')
			filename = new Pfile(filename);
    	if (path.constructor.name == 'String')
			path = new Pfile(path);
    	
		if (filename.exists() && filename.isFile()) {
			var crc32 = new CRC32();
			crc32.computeFileCRC(filename);
			this.crc32Checksum = crc32.getResult();			// (4)
			this.compressedSize = filename.getFileSize();	// (4)		
    		this.uncompressedSize = this.compressedSize;	// (4)
    		this.setDateAndTime(filename.getModificationTime());    		
		}
		else {
			this.crc32Checksum = 0;
			this.compressedSize = 0;		
    		this.uncompressedSize = 0;		
    		this.fileModificationTime = 0;					// (2 bytes) bits 11-15 = hours, bits 05-10 = minutes, bits 00-04 = seconds/2
    		this.fileModificationDate = 0;					// (2 bytes) bits 09-15 = year from 1980, bits 05-08 = month, bits 00-04 = day
		}
		
		if (path.name == '') 
			this.filename = filename.getFilename();
		else
			this.filename = path.addPath(filename.getFilename()).name;
		
		this.filenameLength = this.determineFilenameLength(this.filename); 		// (2)

    	// local file header
    	this.versionNeeded = 0x14;							// (2) version 2.0
    	this.bitFlags = 2048;								// (2) bit 11 = UTF-8 filenames; no encryption; no compression.
    	this.compressionMethod = 0;							// (2) no compression method
    	this.extraFieldLength = 0;							// (2)
    	this.extraField = null;
    	
    	// central directory file header
    	this.versionMadeBy = 0x0314;						// (2) 0x03 = Unix / 0x14 = version 2.0
    	this.fileCommentLength = 0;	 						// (2)
    	this.fileComment = null;
    	this.diskNumberStart = 0;							// (2)
    	this.internalFileAttributes = 1;					// (2)		0 = binary file; 1 = text file
    	this.externalFileAttributes = 0x20;					// (4)		s/b 0x10 for directories  (? 0x20 archive)
    	this.relativeOffsetOfLocalHeader = relativeOffset;	// (4)
    	
    	this.sizeofLFH = 30 + this.filenameLength;			// the number of bytes used by the local file header
    	this.sizeofCDR = 46 + this.filenameLength;			// the number of bytes used by the central directory record
    	
    	Object.seal(this);
    }	
    
    // use this for UTF-8 encoded filenames
	determineFilenameLength(str) {
		expect(str, 'String');
		var len = str.length;
		for (let i=str.length-1; i >= 0; i--) {
			var code = str.charCodeAt(i);
			if (code > 0x007f && code <= 0x07ff)
				len++;
			else if (code > 0x07ff && code <= 0xffff)
				len += 2;
			if (code >= 0xDC00 && code <= 0xDFFF)
				i--; // trail surrogate
		}
		return len;
	}

	setDateAndTime(ts) {
    	expect(ts, 'Date');
    	
    	// (2 bytes) bits 11-15 = hours, bits 05-10 = minutes, bits 00-04 = seconds/2
    	var seconds = Math.floor(ts.getSeconds() / 2);
    	var minutes = ts.getMinutes() + 1;
    	this.fileModificationTime = (ts.getHours() * Math.pow(2,11)) + (minutes * Math.pow(2,5)) + seconds;
    	
    	// (2 bytes) bits 09-15 = year from 1980, bits 05-08 = month, bits 00-04 = day
    	var year = ts.getFullYear() - 1980;
    	var month = ts.getMonth() + 1;
    	this.fileModificationDate = (year * Math.pow(2,9)) + (month * Math.pow(2,5)) + ts.getDate();					
    }
    
    // this goes before the file payload
	writeLocalFileHeader(bw) {
		expect(bw, 'BinaryWriter');
		
		bw.writeUint32(0x04034b50);				// signature
		bw.writeUint16(this.versionNeeded);
		bw.writeUint16(this.bitFlags);
		bw.writeUint16(this.compressionMethod);
		bw.writeUint16(this.fileModificationTime);
		bw.writeUint16(this.fileModificationDate);
		bw.writeUint32(this.crc32Checksum);
		bw.writeUint32(this.compressedSize);
		bw.writeUint32(this.uncompressedSize);
		bw.writeUint16(this.filenameLength);
		bw.writeUint16(this.extraFieldLength);
		bw.writeText(this.filename);
	}
	
	// this goes after all localFileHeader/payload pairs
	writeCentralDirectoryFileHeader(bw) {
		expect(bw, 'BinaryWriter');
		
		bw.writeUint32(0x02014b50);				// signature
		bw.writeUint16(this.versionMadeBy);
		bw.writeUint16(this.versionNeeded);
		bw.writeUint16(this.bitFlags);
		bw.writeUint16(this.compressionMethod);
		bw.writeUint16(this.fileModificationTime);
		bw.writeUint16(this.fileModificationDate);
		bw.writeUint32(this.crc32Checksum);
		bw.writeUint32(this.compressedSize);
		bw.writeUint32(this.uncompressedSize);
		bw.writeUint16(this.filenameLength);
		bw.writeUint16(this.extraFieldLength);
		bw.writeUint16(this.fileCommentLength);
		bw.writeUint16(this.diskNumberStart);
		bw.writeUint16(this.internalFileAttributes);//0x01
		bw.writeUint32(this.externalFileAttributes);//0x20
		bw.writeUint32(this.relativeOffsetOfLocalHeader);
		bw.writeText(this.filename);
	}
}

export default class Zip {
		
    constructor() {
    	this.bw = new BinaryWriter();
    	this.headers = new Array();							// array of LocalFileHeaders
    	this.bytesWrittenSoFar = 0;							// number of bytes written so far
    	this.cdr = new CentralDirectoryRecord();
    }

    // This will create an empty zip archive
    // If a archive already exists, it will be overwritten
    create(zipFilename) {
    	expect(zipFilename, ['String', 'Pfile']);
    	if (zipFilename.constructor.name == 'String')
    		zipFilename = new Pfile(zipFilename);
    	
    	if (zipFilename.exists() && zipFilename.isFile())
    		FS.unlinkSync(zipFilename.name);
    	
    	this.bw.open(zipFilename);
    }
    
    // Add the contents of the given file to the archive
    //> filename is a fully qualified filename
	//> path is a directory path to prepend to the bare filename obtained from the first argument,
	//   so the name written to the local file header will be path + filename.getFilename()
    addFile(filename, path) {
    	expect(filename, ['String', 'Pfile']);
    	expect(path, ['String', 'Pfile']);
    	
    	if (filename.constructor.name == 'String')
			filename = new Pfile(filename);
    	if (path.constructor.name == 'String')
			path = new Pfile(path);
    	
    	if (!filename.exists() || !filename.isFile()) {
    		log.abnormal(`File does not exist "${filename.name}", skipping`);
    		return;
    	}
    	if (filename.isDirectory()) {
    		log.abnormal(`Directories cannot be added to zip archive "${filename.name}"`);
    		return;
    	}
    	
    	try {
	    	var lfh = new LocalFileHeader(filename, path, this.bytesWrittenSoFar);
	    	lfh.writeLocalFileHeader(this.bw);
	    	this.headers.push(lfh);
	    	
	    	var br = new BinaryReader(filename);
	    	br.open(filename);
	    	while (br.readBlock())
	    		this.bw.writeBlock(br.buffer, br.bufferLength);
	    	br.close();
	    	
	    	this.bytesWrittenSoFar += lfh.sizeofLFH + lfh.compressedSize;
	    	this.cdr.numberOfCDRthisDisk++;
	    	this.cdr.totalNumberOfCDR++;
	    	this.cdr.offsetOfStartOfCentralDirectory = this.bytesWrittenSoFar;
	    	this.cdr.sizeOfCentralDirectory += lfh.sizeofCDR;
    	}
    	catch (e) {
    		log.abnormal(e.message);
    	}
    }
    
    close() {
    	for (let i=0; i < this.headers.length; i++) {
    		this.headers[i].writeCentralDirectoryFileHeader(this.bw);
    	}   	
    	this.cdr.writeEnd(this.bw);
    	this.bw.close();
    }
}