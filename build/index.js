"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");

var middleware = function middleware(Router) {
  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      var query, parse_query_string;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              parse_query_string = function parse_query_string(query) {
                for (var q in query) {
                  try {
                    query[q] = JSON.parse(decodeURIComponent(ctx.query[q]));
                  } catch (e) {
                    query[q] = ctx.query[q];
                  }
                }
                return query;
              };

              query = {};


              query = parse_query_string(ctx.query);
              _context.next = 5;
              return Router.find(ctx.method, ctx.path, ctx.headers, ctx.request.body, query, ctx).catch(function (err) {
                console.log(err.stack || err);
                ctx.status = err.code || ctx.status;
                return err;
              });

            case 5:
              ctx.body = _context.sent;

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};
exports.default = middleware;