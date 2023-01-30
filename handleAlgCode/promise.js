

/**
 * Promise当前状态必须为以下三种之一
 * 1、等待态
 * 2、已完成
 * 3、已拒绝
 * then ⽅法必须返回⼀个 promise 对象 promise2 = promise1.then(onFulfilled, onRejected);
 * 只要 onFulfilled 或者 onRejected 返回⼀个值 x ，promise 2 都会进⼊ onFulfilled 状态
 * 如果 onFulfilled 或者 onRejected 抛出⼀个异常 e ，则 promise2 必须拒绝执⾏，并返回 拒因 e
 * 如果 onFulfilled 不是函数且 promise1 状态变为已完成， promise2 必须成功执⾏并返回相 同的值
 * 如果 onRejected 不是函数且 promise1 状态变为已拒绝， promise2 必须执⾏拒绝回调并返 回相同的据因
 */

class Promise {

    constructor(handleFunction) {
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledList = [];
        this.rejectedList = [];

        handleFunction(this.triggerResolve.bind(this), this.triggerReject.bind(this));

    }

    triggerResolve(val) {
        // 当前promise 状态变成了resolve，要执行后续的操作
        // 在下个event loop拿到 status 和 value
        setTimeout(() => {
            if (this.status !== 'pending') {
                return;
            }

            if (val instanceof Promise) {
                val.then(
                    value => { },
                    err => { },
                )
            } else {
                // resolve 传入的是普通值
                this.status = 'fulfilled';
                this.value = val;
                this.triggerFulfilled(val);
            }
        }, 0);
    }

    triggerFulfilled(val) {
        this.fulfilledList.forEach(item => item(val));
        this.fulfilledList = [];
    }

    triggerReject() {
        this.rejectedList.forEach(item => item());
        this.rejectedList = [];
    }

    then(onFulfilled, onRejected) {
        const { value, status } = this;
        return new Promise((onNextFulfilled, onNextRejected) => {

            function onFinalFulfilled(val) {
                // 上一个promise返回的是一个函数，放到下一个promise里执行
                if (typeof onFulfilled !== 'function') {
                    onNextFulfilled(val);
                } else {
                    const res = onFulfilled(val);
                    // 上一个返回的是promise
                    if (res instanceof Promise) {
                        res.then(onNextFulfilled, onNextRejected);
                    } else {
                        onNextFulfilled(res);
                    }
                }
            }

            switch (status) {
                case 'pending':
                    this.fulfilledList.push(onFinalFulfilled);
                    this.rejectedList.push(onRejected);
                    break;
                case 'fulfilled':
                    onFinalFulfilled(value);
                    break;

            }
        })

    }
    catch() {
        return this.then(null, onRejected);
    }

    static resolve(val) {
        if (val instanceof Promise) return val;
        return new Promise(resolve => resolve(val));
    }

    static reject() {
        if (val instanceof Promise) return val;
        return new Promise((resolve, reject) => reject(val));
    }
    static all(list) {
        // 同步的方式让list变成同步逻辑的状态
        return new Promise((resolve, reject) => {
            let count = 0;
            const values = [];
            list.forEach((promiseInstance, i) => {
                Promise.resolve(promiseInstance).then(res => {
                    values[i] = res;
                    count++;
                    if (count === list.length) {
                        resolve(666);
                    }
                }, err => {
                    reject(err);
                })
            })
        })
    }
    static race(list) {
        // 多个promise实例，当有一个实例状态改变时，就会进入race且状态不可改变，多个promise实例为竞争状态
        return new Promise((resolve, reject) => {
            list.forEach((item) => {
                Promise.resolve(item).then(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                })
            })
        })
    }
}

const promise = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(' hello world'); }, time)
    });
}



Promise.all([promise(1000), promise(2000)]).then((res) => {
    console.log("===>res", res);
}, (e) => {
    console.log("===>err", err);
})