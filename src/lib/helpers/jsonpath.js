/* JSONPath 0.8.0 - XPath for JSON
 *
 * Copyright (c) 2007 Stefan Goessner (goessner.net)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */
module.exports = function jsonPath(obj, expr, arg) {
  var P = {
    resultType: arg && arg.resultType || 'VALUE',
    result: [],
    normalize: function(expr) {
      var subx = [];
      return expr.replace(/[["](\??\(.*?\))[\]"]/g, function($0, $1) {
        return '[#' + (subx.push($1) - 1) + ']';
      })
        .replace(/'?\.'?|\['?/g, ';')
        .replace(/;;;|;;/g, ';..;')
        .replace(/;$|'?\]|'$/g, '')
        .replace(/#([0-9]+)/g, function($0, $1) {
          return subx[$1];
        });
    },
    asPath: function(path) {
      var x = path.split(';');
      var p = '$';
      for (var i = 1, n = x.length; i < n; i++)
        p += /^[0-9*]+$/.test(x[i]) ? ('[' + x[i] + ']') : ('[\'' + x[i] + '\']');
      return p;
    },
    store: function(p, v) {
      if (p) P.result[P.result.length] = P.resultType === 'PATH' ? P.asPath(p) : v;
      return !!p;
    },
    trace: function(expr, val, path) {
      if (expr) {
        var x = expr.split(';');
        var loc = x.shift();
        x = x.join(';');
        // eslint-disable-next-line no-prototype-builtins
        if (val && val.hasOwnProperty(loc))
          P.trace(x, val[loc], path + ';' + loc);
        else if (loc === '*')
          P.walk(loc, x, val, path, function(m, l, x, v, p) {
            P.trace(m + ';' + x, v, p);
          });
        else if (loc === '..') {
          P.trace(x, val, path);
          P.walk(loc, x, val, path, function(m, l, x, v, p) {
            typeof v[m] === 'object' && P.trace('..;' + x, v[m], p + ';' + m);
          });
        } else if (/,/.test(loc)) { // [name1,name2,...]
          for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++)
            P.trace(s[i] + ';' + x, val, path);
        } else if (/^\(.*?\)$/.test(loc)) // [(expr)]
          P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(';') + 1)) + ';' + x, val, path);
        else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
          P.walk(loc, x, val, path, function(m, l, x, v, p) {
            if (P.eval(l.replace(/^\?\((.*?)\)$/, '$1'), v[m], m)) P.trace(m + ';' + x, v, p);
          });
        else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc))
          P.slice(loc, x, val, path);
      } else
        P.store(path, val);
    },
    walk: function(loc, expr, val, path, f) {
      if (val instanceof Array) {
        for (var i = 0, n = val.length; i < n; i++)
          if (i in val)
            f(i, loc, expr, val, path);
      } else if (typeof val === 'object') {
        for (var m in val)
          // eslint-disable-next-line no-prototype-builtins
          if (val.hasOwnProperty(m))
            f(m, loc, expr, val, path);
      }
    },
    slice: function(loc, expr, val, path) {
      if (val instanceof Array) {
        var len = val.length;
        var start = 0;
        var end = len;
        var step = 1;
        loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0, $1, $2, $3) {
          start = parseInt($1 || start);
          end = parseInt($2 || end);
          step = parseInt($3 || step);
        });
        start = (start < 0) ? Math.max(0, start + len) : Math.min(len, start);
        end = (end < 0) ? Math.max(0, end + len) : Math.min(len, end);
        for (var i = start; i < end; i += step)
          P.trace(i + ';' + expr, val, path);
      }
    },
    eval: function(x, _v) {
      try {
        return $ && _v && eval(x.replace(/@/g, '_v'));
      } catch (e) {
        throw new SyntaxError('jsonPath: ' + e.message + ': ' +
          x.replace(/@/g, '_v').replace(/\^/g, '_a'));
      }
    }
  };

  var $ = obj;
  if (expr && obj && (P.resultType === 'VALUE' || P.resultType === 'PATH')) {
    P.trace(P.normalize(expr).replace(/^\$;/, ''), obj, '$');
    return P.result.length ? P.result : false;
  }
};