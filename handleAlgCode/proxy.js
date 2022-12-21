/**
 * 基于proxy的响应式
 *  proxy：创建一个对象的代理，实现基本操作的拦截和定义
 *  用法：var proxy = new Proxy(target, handler)
 *  handler拦截属性，如下
 *      get(target,propKey,receiver)：拦截对象属性的读取
        set(target,propKey,value,receiver)：拦截对象属性的设置
        has(target,propKey)：拦截propKey in proxy的操作，返回一个布尔值
        deleteProperty(target,propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值
        ownKeys(target)：拦截Object.keys(proxy)、for...in等循环，返回一个数组
        getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
        defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc），返回一个布尔值
        preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值
        getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象
        isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值
        setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值
        apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作
        construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作
 * 监听属性的删除、变化
 * Reflect
 *  若要在Proxy内调用对象的默认行为
 */

let observerStore = new Map();

function makeObservable(target) {
    // 创建全局唯一key
    let handlerName = Symbol('handler');
    // 所有observe有一个回调和key
    observerStore.set(handlerName, []);

    target.observer = function (handler) {
        observerStore.get(handlerName).push(handler);
    }

    const proxyHandler = {
        get(target, property, receiver) {

            if (typeof target[property] === 'object' && target[property] !== null) {
                return new Proxy(target[property], proxyHandler);
            }

            let success = Reflect.get(...arguments);

            if (success) {
                observerStore.get(handlerName).forEach(handler => handler('get', property, target[property]));
            }

            return success;
        },
        set(target, property, receiver) {
            let success = Reflect.set(...arguments);

            if (success) {
                observerStore.get(handlerName).forEach(handler => handler('set', property, target[property]));
            }

            return success;
        },
        deleteProperty(target, property) {
            let success = Reflect.deleteProperty(...arguments);
            if (success) {
                observerStore.get(handlerName).forEach(handler => handler('delete', property, target[property]));
            }

            return success;
        }
    };



    // 创建proxy， 拦截更改
    return new Proxy(target, proxyHandler);
}

let user = {}

user = makeObservable(user)

user.observer((action, key, value) => {
    console.log(`${action} key=${key} value=${value || ''}`);
})

user.name = 'john'
console.log(user.name);

delete user.name;