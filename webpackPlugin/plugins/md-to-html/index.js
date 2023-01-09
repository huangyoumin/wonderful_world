const { readFileSync } = require('fs');
const { resolve } = require('path');
const { compileHTML } = require('./compiler');
const { randomNum } = require('./utils');

const innerMark = '<!-- inner -->';

class MdToHtmlPlugin {
    constructor({ template, filename }) {

        console.log("===>template", template, filename);

        if (!template) {
            throw new Error('The config for "template" muse be configured');
        }

        this.template = template;
        this.filename = filename || 'md.html';

    }

    apply(compiler) {
        compiler.hooks.emit.tap('md-to-html-plugin', (compilation) => {
            const _assets = compilation.assets;
            const _mdContent = readFileSync(this.template, 'utf-8');
            const _templateHTML = readFileSync(resolve(__dirname, 'template.html'), 'utf-8');
            const _mdContentArr = _mdContent.split('\n');
            console.log(_mdContentArr)
            const _htmlString = compileHTML(_mdContentArr);

            const _finalHTML = _templateHTML.replace(innerMark, _htmlString);

            _assets[this.filename] = {
                source() {
                    return _finalHTML;
                },
                size() {
                    return _finalHTML.length;
                }
            }
        })
    }
}

module.exports = MdToHtmlPlugin;