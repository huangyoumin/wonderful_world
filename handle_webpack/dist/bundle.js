
        (function(graph) {
            function require(file) {

                function absRequire(realPath) {
                    return require(graph[file].deps[realPath])
                }
                var exports = {};
                (function (require, exports, code) {
                    eval(code);
                })(absRequire, exports, graph[file].code)

                return exports;
            }
            require('./src/index.js')
        })({"./src/index.js":{"deps":{"./add.js":"./src/add.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\nconsole.log(\"==>add 1, 2 hh = \", (0, _add[\"default\"])(1, 2));"},"./src/add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = function _default(a, b) {\n  return a + b;\n};\nexports[\"default\"] = _default;"}})
    