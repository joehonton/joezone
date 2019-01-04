/* Copyright (c) 2019 Joe Honton */
/* Copyright (c) 2019 Read Write Tools */
var FS = require('fs'), Log = require('./log.class.js'), expect = require('./expect.function.js'), BinaryWriter = require('./binary-writer.class.js');

module.exports = class TextWriter extends BinaryWriter {
    constructor() {
        super(), this.isStream = !1, Object.seal(this);
    }
    open(e) {
        return expect(e, [ 'String', 'Pfile' ]), 'stdout' == e ? (this.isStream = !0, !0) : super.open(e);
    }
    isOpen() {
        return !!this.isStream || super.isOpen();
    }
    close() {
        return this.isStream ? void 0 : super.close();
    }
    puts(e) {
        if (expect(e, 'String'), !this.isOpen()) return null;
        try {
            this.isStream ? process.stdout.write(e) : FS.writeSync(this.fd, e);
        } catch (e) {
            log.abnormal(e.message);
        }
    }
    putline(e) {
        this.puts(e + '\n');
    }
};