// @common
import PFile from '../../src/pfile.class';
var pathToFixtures = 'test/fixtures/pfile-and-bunch-tests';

//-------------------------------------
//@using three constructor types
var a = new Pfile().setPath(pathToFixtures);	// default constructor
var b = new Pfile(pathToFixtures); 				// String constructor
var c = new Pfile(a);							// Copy constructor

//@testing
;; a.name == b.name && b.name == c.name;

//-------------------------------------
//@using constructor and addPath
var fname;
var f = new Pfile(pathToFixtures).addPath(fname);
var exists = f.exists();
var isFile = f.isFile();
var isDir = f.isDirectory();
var isRelative = f.isRelativePath();
var isAbsolute = f.isAbsolutePath();
var isDotted = f.isDottedPath();
var isSymlink = f.isSymbolicLink();
var path = f.getPath();
var filename = f.getFilename();
var stem = f.getStem();
var extension = f.getExtension();
var fqn = f.getFQN();

//@testing simple files
fname = "regular.abc";		;; (!exists) && (!isFile) && (!isDir) && (isRelative) && (!isAbsolute) && (!isDotted) && (!isSymlink) && path == "test/fixtures/pfile-and-bunch-tests" && filename == "regular.abc"      && stem == "regular"       && extension == "abc" &&  fqn == "test/fixtures/pfile-and-bunch-tests/regular.abc"
fname = "regular";			;; (exists)  && (isFile)  && (!isDir) && (isRelative) && (!isAbsolute) && (!isDotted) && (!isSymlink) && path == "test/fixtures/pfile-and-bunch-tests" && filename == "regular"          && stem == "regular"       && extension == ""    &&  fqn == "test/fixtures/pfile-and-bunch-tests/regular"
fname = "regular.js";		;; (exists)  && (isFile)  && (!isDir) && (isRelative) && (!isAbsolute) && (!isDotted) && (!isSymlink) && path == "test/fixtures/pfile-and-bunch-tests" && filename == "regular.js"       && stem == "regular"       && extension == "js"  &&  fqn == "test/fixtures/pfile-and-bunch-tests/regular.js"
fname = "regular.class.js";	;; (exists)  && (isFile)  && (!isDir) && (isRelative) && (!isAbsolute) && (!isDotted) && (!isSymlink) && path == "test/fixtures/pfile-and-bunch-tests" && filename == "regular.class.js" && stem == "regular.class" && extension == "js"  &&  fqn == "test/fixtures/pfile-and-bunch-tests/regular.class.js"
fname = ".hidden-file";		;; (exists)  && (isFile)  && (!isDir) && (isRelative) && (!isAbsolute) && (!isDotted) && (!isSymlink) && path == "test/fixtures/pfile-and-bunch-tests" && filename == ".hidden-file"     && stem == ".hidden-file"  && extension == ""    &&  fqn == "test/fixtures/pfile-and-bunch-tests/.hidden-file"

//@testing simple directory names
fname = "pattern";			;; (exists)  && (!isFile) && (isDir)  && (isRelative) && (!isAbsolute) && (!isDotted) && (!isSymlink) && path == "test/fixtures/pfile-and-bunch-tests/pattern"     && filename == ""     && stem == ""              && extension == ""    &&  fqn == "test/fixtures/pfile-and-bunch-tests/pattern"
fname = ".hidden-dir";		;; (exists)  && (!isFile) && (isDir)  && (isRelative) && (!isAbsolute) && (!isDotted) && (!isSymlink) && path == "test/fixtures/pfile-and-bunch-tests/.hidden-dir" && filename == ""     && stem == ""              && extension == ""    &&  fqn == "test/fixtures/pfile-and-bunch-tests/.hidden-dir"

//@testing relative files
fname = "./regular.js";		;; (exists)  && (isFile)  && (!isDir) && (isRelative) && (!isAbsolute) && (!isDotted) && (!isSymlink) && path == "test/fixtures/pfile-and-bunch-tests" && filename == "regular.js"       && stem == "regular"       && extension == "js"  &&  fqn == "test/fixtures/pfile-and-bunch-tests/regular.js"
//TODO MORE
	
	
//@using addPathBefore
var filename, prefixPath;	
var f = new Pfile(filename).addPathBefore(prefixPath);
var path = f.getPath();
var filename = f.getFilename();
var fqn = f.getFQN();

//@testing	
filename = "";                    prefixPath = "abc";				;; path == ""              && filename == "abc"  		 &&  fqn == "abc"
filename = "abc";                 prefixPath = "";					;; path == ""              && filename == "abc"  		 &&  fqn == "abc"
filename = "regular.xyz";         prefixPath = "abc";				;; path == "abc"           && filename == "regular.xyz"  &&  fqn == "abc/regular.xyz"
filename = "regular.xyz";         prefixPath = "abc/";				;; path == "abc"           && filename == "regular.xyz"  &&  fqn == "abc/regular.xyz"
filename = "regular.xyz";         prefixPath = "/abc";				;; path == "/abc"          && filename == "regular.xyz"  &&  fqn == "/abc/regular.xyz"
filename = "regular.xyz";         prefixPath = "/abc/";				;; path == "/abc"          && filename == "regular.xyz"  &&  fqn == "/abc/regular.xyz"
filename = "def/ghi/regular.xyz"; prefixPath = "abc";				;; path == "abc/def/ghi"   && filename == "regular.xyz"  &&  fqn == "abc/def/ghi/regular.xyz"
filename = "ghi/regular.xyz";     prefixPath = "abc/def";			;; path == "abc/def/ghi"   && filename == "regular.xyz"  &&  fqn == "abc/def/ghi/regular.xyz"
filename = "def/ghi/regular.xyz"; prefixPath = "/abc";				;; path == "/abc/def/ghi"  && filename == "regular.xyz"  &&  fqn == "/abc/def/ghi/regular.xyz"
filename = "ghi/regular.xyz";     prefixPath = "/abc/def";			;; path == "/abc/def/ghi"  && filename == "regular.xyz"  &&  fqn == "/abc/def/ghi/regular.xyz"


