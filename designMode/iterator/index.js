// 迭代器模式

var array = [1, 2, 3];

array.forEach((item, index, self) => {

})

const forEach = (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        callback.call(array[i], array[i], i, array);
    }
}


const Iterator = (obj) => {
    let current = 0;
    let next = () => {
        current += 1;
    }
    let isFinish = () => {
        return !!(current >= obj.length);
    }
    let getCurrentItem = () => {
        return obj[current];
    }

    return {
        next,
        isFinish,
        getCurrentItem,
    }
}

let array1 = [1, 2, 3, 4, 5];
let array2 = [1, 2, 3, 4, 5];
let array3 = [5, 2, 3, 4, 5];

let array1Iterator = Iterator(array1);
let array2Iterator = Iterator(array2);
let array3Iterator = Iterator(array3);

const compare = (Iterator1, Iterator2) => {
    while (!Iterator1.isFinish() && !Iterator2.isFinish()) {
        if (Iterator1.getCurrentItem() !== Iterator2.getCurrentItem()) {
            return 'different'
        }
        Iterator1.next();
        Iterator2.next();
    }
    return 'same'
}


// console.log(compare(array1Iterator, array2Iterator));
console.log(compare(array1Iterator, array3Iterator));