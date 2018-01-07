var StackTrace = require('./stack-trace.class.js');

module.exports = function proxyExpect(e, t, s) {
    s = s || '';
    if (void 0 === t) return logicMessage('\'type\' should be a String or an Array of Strings, but is undefined'), 
    !1;
    if (null === t) return logicMessage('\'type\' should be a String or an Array of Strings, but is null'), 
    !1;
    if ('String' == t.constructor.name) {
        if (1 == expectOne(e, t, s)) return !0;
    } else {
        if ('Array' != t.constructor.name) return logicMessage('\'type\' should be a String or an Array of Strings'), 
        !1;
        for (let r of t) if (1 == expectOne(e, r, s)) return !0;
    }
    var r = '';
    return r = 'String' == t.constructor.name ? `Expected type '${t}'` : 'Expected one of these types \'' + t.join('|') + '\'', 
    expectMessage(void 0 === e ? `${r}, but got 'undefined' ${s}` : null === e ? `${r}, but got 'null' ${s}` : `${r}, but got '${e.constructor.name}' ${s}`), 
    !1;
};

function expectOne(e, t, s) {
    if (void 0 === e) expectMessage(`Expected 'Object', but got 'undefined' ${s}`); else if (null === e) expectMessage(`Expected 'Object', but got 'null' ${s}`); else if ('Object' != e.constructor.name) expectMessage(`Expected 'Object', but got '${e.constructor.name}' ${s}`); else if (void 0 === e.jsClassName) expectMessage(`Expected 'jsClassName' to be a String, but got 'undefined' ${s}`); else if (null === e.jsClassName) expectMessage(`Expected 'jsClassName' to be a String, but got 'null' ${s}`); else if ('String' != e.jsClassName.constructor.name) expectMessage(`Expected 'jsClassName' to be a String, but got '${e.jsClassname.constructor.name}' ${s}`); else if ('String' != t.constructor.name) expectMessage(`Expected 'expectedType' to be a String, but got '${t.constructor.name}' ${s}`); else {
        if (e.jsClassName == t) return !0;
        expectMessage(`Expected '${t}', but got '${e.jsClassName}' ${s}`);
    }
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