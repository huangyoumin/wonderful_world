// 防抖：n秒后执行该事件，若在n秒内重新触发，则重新计时

const debounce = (fn, wait) => {
    let lastTime = null;
    let timer = null;
    return (...arg) => {
        const nowTime = new Date();
        clearTimeout(timer);
        lastTime = nowTime;
        timer = setTimeout(() => fn(...arg), wait);
    }
}

const clg = debounce((n) => {
    console.log(n);
}, 100)

clg(1);

setTimeout(() => {
    clg(2);
}, 150)
