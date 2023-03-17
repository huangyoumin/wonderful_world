Function.prototype.call = function (context) {
    context = context ? Object(context) : window

    context.fn = this

    let args = [...arguments].slice(1)

    let result = context.fn(...args, this)

    delete context.fn

    return result
}

Function.prototype.apply = function (context, arr = []) {
    context = context ? Object(context) : window
    context.fn = this;

    var result = context.fn(...arr);
    delete context.fn;
    return result;
}

Function.prototype.bind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError("Error")
    }

    context = context ? Object(context) : window
    var _this = this

    var args = [...arguments].slice(1)

    return function F() {
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }

}

const Obj = {
    name: 'a'
}

function f() {
    console.log('===>a', this.name, ...arguments);
}

f.call(Obj);