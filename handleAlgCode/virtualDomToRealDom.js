/**
 * 给出如下数据结构的虚拟DOM，转换成真实DOM
 * 
 */

const vNode = {
    tag: "DIV",
    attrs: {
        id: 'app'
    },
    children: [{
        tag: 'SPAN',
        children: [{
            tag: 'A',
            children: []
        }]
    },
    {
        tag: 'SPAN',
        children: [
            { tag: 'A', children: [] },
            { tag: 'A', children: [] }
        ]
    }
    ]
}

function render(vNode) {
    if (typeof vNode === 'number') {
        vNode = String(vNode);
    }

    if (typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }

    const element = document.createElement(vNode.tag);

    if (vNode.attrs) {
        Object.keys(vNode.attrs).forEach((key) => {
            element.setAttribute(key, vNode.attrs[key]);
        })
    }

    if (vNode.children && vNode.children.length) {
        vNode.children.forEach((childNode) => {
            element.appendChild(render(childNode));
        })
    }

    return element;

}