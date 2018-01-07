var StackTrace = require('./stack-trace.class.js');

module.exports = function expect(e, r, t) {
    t = t || '';
    if (void 0 === r) return logicMessage('\'type\' should be a String or an Array of Strings, but is undefined'), 
    !1;
    if (null === r) return logicMessage('\'type\' should be a String or an Array of Strings, but is null'), 
    !1;
    if ('String' == r.constructor.name) {
        if (1 == expectOne(e, r)) return !0;
    } else {
        if ('Array' != r.constructor.name) return logicMessage('\'type\' should be a String or an Array of Strings'), 
        !1;
        for (let t of r) if (1 == expectOne(e, t)) return !0;
    }
    var o = '';
    return o = 'String' == r.constructor.name ? `Expected type '${r}'` : 'Expected one of these types \'' + r.join('|') + '\'', 
    expectMessage(void 0 === e ? `${o}, but got 'undefined' ${t}` : null === e ? `${o}, but got 'null' ${t}` : `${o}, but got '${e.constructor.name}' ${t}`), 
    !1;
};

function expectOne(e, r) {
    return void 0 === e ? 'undefined' == r : null === e ? 'null' == r : e.constructor.name == r;
}

function logicMessage(e) {
    writeToConsoleOrStderr(`[*EXPECT*] Logic: ${e = e || ''}\n`);
}

function expectMessage(e) {
    e = e || '', writeToConsoleOrStderr(`[*EXPECT*]${StackTrace.getFunctionName(4)} ${e}\n`);
}

function writeToConsoleOrStderr(e) {
    if ('object' == typeof console && 'function' == typeof console.warn) console.warn(e); else {
        if ('object' != typeof process || 'object' != typeof process.stderr || 'function' != typeof process.stderr.write) throw new Error(e);
        process.stderr.write(e);
    }
}