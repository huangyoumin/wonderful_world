// 作用域查找时，是根据定义时的顺序向外找，不是执行时
// 例如，demo里的name会按照代码顺序向外找，不是根据运行时的上下文，因此此时就会报错
/*
function demo() {
    console.log("===>name", name);
}

function outer() {
    var name = 'xiao ming';
    demo();
}

outer();
*/



const obj = {
    name: 'obj',
    fun: function () {
        console.log("name", this.name);
    }
}

const zz = {
    name: 'zz'
}

zz.fun = obj.fun;
zz.fun();