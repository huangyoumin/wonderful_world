const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

/**
 * 分析单独模块
 * @param {*} file
 */
function getModuleInfo(file) {
    // ES6转换ES5

    const body = fs.readFileSync(file, 'utf-8');
    // 收集依赖 -> 有哪些import
    // 转换ast语法树
    // 代码str => 对象 => 对象遍历解析
    // 这就是编译过程

    const ast = parser.parse(body, {
        sourceType: 'module', // 使用的是ESModule
    })

    const deps = {};

    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirName = path.dirname(file);
            const absPath = './' + path.join(dirName, node.source.value);
            deps[node.source.value] = absPath;
        }
    });

    // es6 => es5
    const { code } = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env'],
    })

    const moduleInfo = { file, deps, code };
    return moduleInfo;
}

/**
 * 解析模块
 */

function parseModules(file) {
    const entry = getModuleInfo(file);

    const temp = [entry];
    const depsGraph = {};
    getDeps(temp, entry);

    temp.forEach(info => {
        depsGraph[info.file] = {
            deps: info.deps,
            code: info.code,
        };
    })

    return depsGraph;
}

/**
 * 获取依赖
 */
function getDeps(temp, { deps }) {
    Object.keys(deps).forEach(key => {
        const child = getModuleInfo(deps[key]);
        temp.push(child);
        getDeps(temp, child);
    })
}

function bundle(file) {
    const depsGraph = JSON.stringify(parseModules(file));
    return `
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
            require('${file}')
        })(${depsGraph})
    `
}

const content = bundle('./src/index.js');
console.log("===>depsGraph ", content);

!fs.existsSync('./dist') && fs.mkdirSync('./dist')
fs.writeFileSync('./dist/bundle.js', content);