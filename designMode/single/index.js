// 场景：加载一个模块的时候，只初始化一个实例

const { Eager } = require('./eager');
const { Lazy } = require('./lazy');
const inst1 = Lazy.getInstance();
const inst2 = Lazy.getInstance();

console.log(inst1 === inst2);