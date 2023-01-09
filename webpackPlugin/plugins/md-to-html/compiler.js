const reg_mark = /^(.+?)\s/;
const reg_sharp = /^\#/;
const reg_crossbar = /^\-/;
const reg_number = /^\d/;
const { randomNum } = require('./utils');

function createTree(mdArr) {
    let _htmlPool = {};
    let _lastTag = '';
    let _key = '';
    mdArr.forEach((mdFragment) => {
        const matched = mdFragment.match(reg_mark);
        if (matched) {
            const mark = matched[1];
            const input = matched['input'];
            if (reg_sharp.test(mark)) {
                const tag = `h${mark.length}`;

                const tagContent = input.replace(reg_mark, '');
                if (mark === _lastTag) {
                    _htmlPool[`${tag}-${_key}`].tags = [..._htmlPool[tag].tags, `<${tag}>${tagContent}</${tag}>`];
                } else {
                    _key = randomNum();
                    _htmlPool[`${tag}-${_key}`] = {
                        type: 'single',
                        tags: [`<${tag}>${tagContent}</${tag}>`]
                    }
                }
            } else if (reg_crossbar.test(mark)) {
                const tag = `li`;
                const tagContent = input.replace(reg_mark, '');
                if (mark === _lastTag) {
                    _htmlPool[`ul-${_key}`].type = 'wrap';
                    _htmlPool[`ul-${_key}`].tags = [..._htmlPool[`ul-${_key}`].tags, `<${tag}>${tagContent}</${tag}>`];
                } else {
                    _key = randomNum();
                    _htmlPool[`ul-${_key}`] = {
                        type: 'single',
                        tags: [`<${tag}>${tagContent}</${tag}>`]
                    }
                }
            } else if (reg_number.test(mark)) {
                const tagContent = input.replace(reg_mark, '');
                const tag = 'li';
                if (reg_number.test(_lastTag)) {
                    _htmlPool[`ol-${_key}`].tags = [..._htmlPool[`ol-${_key}`].tags, `<${tag}>${tagContent}</${tag}>`];
                } else {
                    _key = randomNum();
                    _htmlPool[`ol-${_key}`] = { type: 'wrap', tags: [`<${tag}>${tagContent}</${tag}>`] };
                }
            }
            _lastTag = mark;

        }
    })
    console.log("==>_html", _htmlPool);
    return _htmlPool;
}

function compileHTML(code) {
    const _htmlPool = createTree(code);
    let _htmlStr = '';
    let item;
    for (let k in _htmlPool) {

        item = _htmlPool[k];
        if (item.type === 'single') {
            _htmlStr += item.tags[0];
        } else {
            let _tmpStr = `<${k.split('-')[0]}>`;
            item.tags.forEach((tag) => {
                _tmpStr += tag;
            })
            _tmpStr += `</${k.split('-')[0]}>`;
            _htmlStr += _tmpStr;
        }

    }
    console.log("==>html", _htmlStr);
    return _htmlStr;
}

module.exports = { compileHTML }