// 饿汉单例模式
// 在加载的时候，实例就初始化了

class Eager {
    static instance = new Eager('eager');

    constructor(name) {
        console.log("name", name);
        this.name = name;
    }
}

module.exports = { Eager };