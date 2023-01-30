// 节流：n秒内只运行一次，若在n秒内多次触发，只执行一次

const throttled = (fn, wait) => {
    let lastTime = null;
    let timer = null;

    return (...arg) => {
        const nowTime = new Date();
        clearTimeout(timer);
        if (nowTime - lastTime < wait) {
            const remain = wait - (nowTime - lastTime);
            setTimeout(() => {
                fn(...arg);
                lastTime = new Date();
            }, remain)
        }
        else {
            fn(...arg);
            lastTime = nowTime;
        }
    }
}