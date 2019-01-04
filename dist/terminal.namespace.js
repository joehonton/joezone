/* Copyright (c) 2019 Joe Honton */
module.exports = class terminal {
    static gray(t) {
        return `[90m${t}[0m`;
    }
    static red(t) {
        return `[91m${t}[0m`;
    }
    static green(t) {
        return `[92m${t}[0m`;
    }
    static yellow(t) {
        return `[93m${t}[0m`;
    }
    static blue(t) {
        return `[94m${t}[0m`;
    }
    static magenta(t) {
        return `[95m${t}[0m`;
    }
    static cyan(t) {
        return `[96m${t}[0m`;
    }
    static white(t) {
        return `[97m${t}[0m`;
    }
    static trace(...t) {
        terminal.write(terminal.gray('   [TRACE] '), t.join(''));
    }
    static invalid(...t) {
        terminal.write(terminal.yellow(' [INVALID] '), t.join(''));
    }
    static warning(...t) {
        terminal.write(terminal.yellow(' [WARNING] '), t.join(''));
    }
    static error(...t) {
        terminal.write(terminal.red('   [ERROR] '), t.join(''));
    }
    static abnormal(...t) {
        terminal.write(terminal.red('[ABNORMAL] ') + terminal.getFunctionName(4), t.join(''));
    }
    static logic(...t) {
        terminal.write(terminal.red('   [LOGIC] ') + terminal.getFunctionName(4), t.join(''));
    }
    static setProcessName(t) {
        Object.defineProperty(terminal, 'processName', {
            value: t,
            writable: !0
        });
    }
    static getProcessName() {
        return void 0 == terminal.processName ? '' : terminal.gray(terminal.processName);
    }
    static write(t, e) {
        terminal.writeToConsoleOrStderr(terminal.getProcessName() + t + e + '\n');
    }
    static writeToConsoleOrStderr(t) {
        if ('object' == typeof console && 'function' == typeof console.warn) console.warn(t); else {
            if ('object' != typeof process || 'object' != typeof process.stderr || 'function' != typeof process.stderr.write) throw new Error(t);
            process.stderr.write(t);
        }
    }
    static getFunctionName(t) {
        var e = new Error().stack.split('\n')[t], r = /at (.*) ?\(/g, i = r.exec(e), n = '';
        return null == i ? e : (i.length > 1 && (n += i[1].trim()), `{${n = terminal.rightAlign(n, 30)}} `);
    }
    static rightAlign(t, e) {
        var r = e, i = t.length;
        return i > r ? t.substr(0, r - 3) + '...' : ' '.repeat(r + 1 - i) + t;
    }
};