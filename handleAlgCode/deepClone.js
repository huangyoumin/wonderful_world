/**
 * 深拷贝
 *  · 尽量处理更多类型
 *  · 处理循环引用
 */

function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) {
        return null;
    }

    if (obj instanceof Date) {
        return new Date(obj);
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    if (typeof obj !== 'object') {
        return obj;
    }

    if (hash.has(obj)) {
        // 解决循环引用问题
        return hash.get(obj);
    }

    const resObj = Array.isArray(obj) ? [] : {};
    hash.set(obj, resObj);

    // 这样也可以循环数组
    Reflect.ownKeys(obj).forEach((key) => {
        resObj[key] = deepClone(obj[key], hash);
    })

    return resObj;
}

deepClone([1, 2, 3, 4]);