module.exports = class StackTrace {
    constructor() {
        Object.seal(this);
    }
    static getFunctionName(t) {
        var e = new Error().stack.split('\n')[t], r = /at (.*) ?\(/g, a = r.exec(e), n = '';
        return null == a ? e : (a.length > 1 && (n += a[1].trim()), `{${n = StackTrace.rightAlign(n, 30)}}`);
    }
    static getSitus(t) {
        var e = new Error().stack.split('\n')[t], r = /at .*\((.*)\)/g, a = r.exec(e), n = '';
        return a.length > 1 && (n += a[1].trim()), n;
    }
    static getInfo(t) {
        var e = {
            classname: '',
            member: '',
            path: '',
            filename: '',
            line: '',
            column: ''
        }, r = new Error().stack.split('\n')[t], a = /at (.*) ?\(/g, n = a.exec(r), l = '';
        n.length > 1 && (l = n[1].trim());
        var s = l.split('.');
        e.classname = s[0], s.length > 1 && (e.member = s[1], e.member = e.member.replace(' (eval at evaluate', ''));
        var i = /at .*\((.*)\)/g, c = i.exec(r), m = '';
        c.length > 1 && (m = c[1].trim());
        var g = m.split(':'), u = g[0];
        g.length > 1 && (e.line = g[1]), g.length > 2 && (e.column = g[2]);
        var h = u.lastIndexOf('/');
        return -1 != h ? (e.path = u.substr(0, h), e.filename = u.substr(h + 1)) : e.filename = u, 
        e;
    }
    static rightAlign(t, e) {
        var r = e, a = t.length;
        return a > r ? t.substr(0, r - 3) + '...' : Array(r + 1 - a).join(' ') + t;
    }
};