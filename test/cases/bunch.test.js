//@common
import Pfile from '../../src/pfile.class';
import Bunch from '../../src/bunch.class';
var fixturesPath = 'test/fixtures/pfile-and-bunch-tests';

//-------------------------------------
//@using String constructor
var path = Pfile.getCwd() + '/' + fixturesPath;
var pattern, flags;
var bunch = new Bunch(path, pattern, flags);
var pfiles = bunch.find();
var files = [];
for (let i=0; i<pfiles.length; i++) {
	files.push(pfiles[i].getFilename());
}

//@testing patterns
pattern = 'regular*';  	flags = Bunch.FILE;			;;	files[0]=='regular' && files[1]=='regular.class.js' && files[2]=='regular.cpp' && files[3]=='regular.h' && files[4]=='regular.js' && files[5]=='regular.txt'
pattern = 'regular.*'; 	flags = Bunch.FILE;			;;	files[0]=='regular.class.js' && files[1]=='regular.cpp' && files[2]=='regular.h' && files[3]=='regular.js' && files[4]=='regular.txt'

//@testing flags	
pattern = '*.cpp'; 									;;	files.length == 1 && files[0]=='regular.cpp'
pattern = '*.cpp'; 		flags = Bunch.FILE;			;;	files.length == 1 && files[0]=='regular.cpp'
pattern = '*.cpp'; 		flags = Bunch.DIRECTORY;	;;	files.length == 0
pattern = '*.cpp'; 		flags = Bunch.SYMLINK;		;;	files.length == 0
pattern = 'escape*'; 	flags = Bunch.FILE;			;;	files.length == 3
pattern = 'escape*'; 	flags = Bunch.DIRECTORY;	;;	files.length == 1
pattern = 'escape*'; 	flags = Bunch.FILE + Bunch.DIRECTORY;	;;	files.length == 4

//@testing with missing arguments
pattern = '*';			flags = Bunch.FILE;			;;	files.length == 15;
pattern = '*';										;;	files.length == 15;		// where flags defaults to Bunch.FILE
													;;	files.length == 15;		// where pattern defaults to '*'

//-------------------------------------
//@using Pfile constructor
var pfile = new Pfile(fixturesPath).makeAbsolute();
pfile.addPath(filename);
var bunch = new Bunch(pfile);
var pfiles = bunch.find();
var files = [];
for (let i=0; i<pfiles.length; i++) {
	files.push(pfiles[i].getFilename());
}

//@testing simple	
var filename = '*.cpp'; 									;;	files.length == 1 && files[0]=='regular.cpp'


//-------------------------------------
//@using Bunch copy constructor
var pfile = new Pfile(fixturesPath).makeAbsolute();
pfile.addPath(filename);
var bunch = new Bunch(pfile);
var bunchCopy = new Bunch(bunch);
var pfiles = bunchCopy.find();
var files = [];
for (let i=0; i<pfiles.length; i++) {
	files.push(pfiles[i].getFilename());
}

//@testing simple	
var filename = '*.cpp'; 									;;	files.length == 1 && files[0]=='regular.cpp'


//-------------------------------------
//@using default constructor with set and get
var pathIn, patternIn, flagsIn;	
var bunch = new Bunch();
bunch.path = Pfile.getCwd() + '/' + fixturesPath + pathIn;
bunch.pattern = patternIn;
bunch.flags = flagsIn;	
var pfiles = bunch.find();
var files = [];
for (let i=0; i<pfiles.length; i++) {
	files.push(pfiles[i].getFilename());
}
var pathOut = bunch.path;
var patternOut = bunch.pattern;
var flagsOut = bunch.flags;

//@testing pathIn and pathOut
pathIn='/.hidden-dir';	patternIn='*';		flagsIn=Bunch.FILE;			;;	files.length == 1  && files[0] == 'fileA' && pathOut != pathIn
pathIn='/escape';		patternIn='*';		flagsIn=Bunch.FILE;			;;	files.length == 1  && files[0] == 'fileB' && pathOut != pathIn
pathIn='/pattern';		patternIn='*';		flagsIn=Bunch.FILE;			;;	files.length == 1  && files[0] == 'fileC' && pathOut != pathIn

//@testing patternIn and patternOut
pathIn='/.hidden-dir';	patternIn='file*';	flagsIn=Bunch.FILE;			;;	files.length == 1  && files[0] == 'fileA' && patternOut == 'file*' 
pathIn='/escape';		patternIn='*';		flagsIn=Bunch.FILE;			;;	files.length == 1  && files[0] == 'fileB' && patternOut == '*'
pathIn='/pattern';		patternIn='*ile*';	flagsIn=Bunch.FILE;			;;	files.length == 1  && files[0] == 'fileC' && patternOut == '*ile*'

//@testing flagsIn and flagsOut
pathIn='';				patternIn='*';		flagsIn=Bunch.FILE;						;;	files.length == 15 && patternOut == '*'  && flagsOut == Bunch.FILE;
pathIn='';				patternIn='*';		flagsIn=Bunch.DIRECTORY;				;;	files.length == 3  && patternOut == '*'  && flagsOut == Bunch.DIRECTORY;
pathIn='';				patternIn='*';		flagsIn=Bunch.FILE + Bunch.DIRECTORY;	;;	files.length == 18 && patternOut == '*'  && flagsOut == Bunch.FILE + Bunch.DIRECTORY;

//TODO
// patterns with {} and [] and ()


