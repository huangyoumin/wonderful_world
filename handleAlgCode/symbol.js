/**
 *  symbol
 *  1. 用来解决属性名冲突的问题，构造唯一属性或者变量
 *  2. 私有属性
 */

function getObj() {
    const symbol = Symbol('test');

    const obj = {};

    obj[symbol] = 'test';

    return obj;
}

const res = getObj();

// 拿不到keys
Object.keys(res).forEach(key => {
    console.log("===>key ", key, res[key]);
})


/**
 * 修改对象，使之可以使用for of
 * 给对象添加迭代器属性
 */

const obj = {
    count: 0,
    [Symbol.iterator]: () => {
        return {
            next: () => {
                obj.count++;
                if (obj.count <= 10) {
                    return {
                        value: obj.count,
                        done: false,
                    }
                } else {
                    return {
                        value: undefined,
                        done: true,
                    }
                }
            }
        }
    }
}


for (item of obj) {
    console.log(item);
}