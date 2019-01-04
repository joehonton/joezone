/* Copyright (c) 2019 Read Write Tools */
var Crypto = require('crypto'), expect = require('./expect.function.js'), Pfile = require('./pfile.class.js'), BinaryReader = require('./binary-reader.class.js'), TextReader = require('./text-reader.class.js');

module.exports = class SHA1 {
    constructor() {
        Object.seal(this);
    }
    checksum(e) {
        expect(e, 'Pfile');
        var r, t = Crypto.createHash('sha1'), a = new TextReader();
        for (a.open(e.getFQN()); null != (r = a.getline()); ) t.update(r, 'utf8');
        return a.close(), t.digest('hex');
    }
    checksumBinary(e) {
        expect(e, 'Pfile');
        var r = Crypto.createHash('sha1'), t = new BinaryReader();
        for (t.open(e.getFQN()); t.readBlock(); ) r.update(t.buffer);
        return t.close(), r.digest('hex');
    }
};