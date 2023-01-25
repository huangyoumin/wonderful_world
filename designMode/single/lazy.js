// 懒汉单例模式
// 引入&实例化后，才初始化实例


class Lazy {
    static instance = null
    static getInstance() {
        if (!Lazy.instance) {
            Lazy.instance = new Lazy('lazy');
        }
        return Lazy.instance
    }
    constructor(name) {
        console.log("lazy", name);
        this.name = name;
    }
}

module.exports = { Lazy };