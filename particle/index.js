// 异步加法
function asyncAdd(a, b, cb) {
    setTimeout(() => {
        cb(null, a + b)
    }, Math.random() * 1000)
}

async function sum(...arg) {
    console.log(arg);
    if (arg.length > 2) {
        // 计算完成后，获取这个值
        const b = await sum(...arg.splice(1));
        return new Promise((resolve) => {
            asyncAdd(arg[0], b, (a, result) => {
                resolve(result);
            })
        })
    } else {
        return new Promise((resolve) => {
            asyncAdd(arg[0], arg[1], (a, result) => {
                resolve(result);
            })
        })
    }


}

async function total() {
    const res1 = await sum(1, 2, 3, 4, 5, 6, 4)
    const res2 = await sum(1, 2, 3, 4, 5, 6, 4)
    return [res1, res2]
}
total().then((res) => {
    console.log(res);
})
// 实现下sum函数。注意不能使用加法，在sum中借助asyncAdd完成加法。尽可能的优化这个方法的时间。
