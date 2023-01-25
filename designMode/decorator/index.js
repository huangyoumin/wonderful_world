// 装饰器模式
// 不修改类的前提下，为类新增功能


const isLogin = (status) => {
    return (target) => {
        target.isLogin = status;
    }
}

@isLogin(false)
class A {

}

console.log(A, new A());