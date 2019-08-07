const URL =  require('url');
exports.useWithUrl = function(URLList, middleware) {
    function isUrlMatch(p, url) {
      if (p && p.url) {
        return isUrlMatch(p.url, url);
      }
      return typeof p === 'string' && p === url || p instanceof RegExp && !!p.exec(url);
    }
    return function (req, res, next) {
      const list = URLList;
      let path = URL.parse(req.originalUrl || '', true).pathname;
      const method = req.method.toUpperCase();
      const result = list.some(c => {
        if (c.method && !Array.isArray(c.method)) {
          c.method = [c.method];
        }
        return isUrlMatch(c, path) && (c.method ? c.method.indexOf(method) > -1 : true);
      });
      return result ? middleware(req, res, next) : next();
    };
}