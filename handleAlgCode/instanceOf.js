/**
 * 实现instanceOf
 * 原理：通过判断隐式类型是否和显式类型相等
 */

function instanceOf(left, right) {
    if (typeof left !== 'object' || left === null) {
        return false;
    }

    while (true) {
        if (left === null) {
            return false;
        }

        if (left.__proto__ === right.prototype) {
            return true;
        }

        left = left.__proto__;
    }
}
