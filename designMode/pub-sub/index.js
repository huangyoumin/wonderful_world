// 发布订阅模式、观察者模式

const map = {};

const list = [];

const listen = (key, fn) => {
    if (!map[key]) map[key] = [];
    map[key].push(fn);
}

const trigger = (key, data) => {
    map[key].forEach((item) => item(data));
}

const remove = (key, fn) => {
    var res = [];
    for (let i = 0; i < map[key].length; i++) {
        var current = map[key][i];
        if (fn !== current) res.push(current);
    }
    map[key] = res;
}

listen('event1', () => {
    console.log("===>this is listen 1");
})

listen('event2', () => {
    console.log("===>this is listen 2");
})
