


// const Input = () => {

//     const [text, setText] = useState('');
//     const [list, setList] = useState([]);
//     const [result, setResult] = useState('');
//     const cnt = useRef(null);

//     useEffect(() => {
//         fetch(text);
//     }, [text])

//     const handleChange = (e, current) => {
//         setText(value);
//         cnt.current.value++;
//         fetch(text, current);
//     }

//     const fetch = (value, current) => {
//         aa(value).then((data) => {
//             const { value } = data;
//             if (current === result.current.value) {
//                 setList(value);
//             }
//         })
//     }

//     const search = (value) => {
//         bb(value).then((data) => {
//             setResult(data.value);
//         })

//         inputRef.innerHTML.title = value;
//     }

//     return <div>
//         <input value={text} onChange={(e) => handleChange(e, cnt.current.value)} ref={inputRef} />
//         <div>
//             {list.map((item) => {
//                 return <div onClick={() => search(item)}>{item}</div>
//             })}
//         </div>
//     </div>
// }





// // promise promise.all

// const promise1, promise2;

// Promise.all([promise1, promise2]).then((data) => {

// })


// let result = [];


// const recordResult = (data, sum) => {
//     result.push(data);
//     if (result === sum) {
//         Promise.resolve(result);
//     }
// }

// const promiseSingle = (promiseArr, index) => {

//     if (index !== promiseArr.length - 1) {
//         promiseSingle(promiseArr, index + 1);
//     }

//     promiseArr[index].then(() => {

//     })

// }


// const promiseAll = (arr, index) => {

//     let successCnt = 0, failCnt = 0;

//     arr.forEach((item) => {
//         item.then((data) => {
//             recordResult(data, arr.length);
//             successCnt++;
//             if (successCnt === arr.length) {
//                 Promise.resolve();
//             }
//         }).catch(e => {
//             failCnt++;
//             Promise.reject();
//         })
//     })


// }

// process.nextTick(() => { console.log('nextTick') })

// Promise.resolve().then(() => { console.log('promise1'); }).then(() => {
//     console.log('promise2');
// });
// setImmediate(() => { console.log('setImmediate') });
// console.log('end')



//
// 1、定时器
//   数组arr
//   每隔一秒打印

// const Print = (arr, index) => {
//     setTimeout(() => {
//         console.log(arr[index]);
//         if (index !== arr.length - 1) {
//             Print(arr, index + 1);
//         }
//     }, 1000);
// }

// Print([4, 3, 2, 1], 0);


const Print = (arr) => {
    let cnt = 0;
    let timer = setInterval(() => {
        console.log(arr[cnt]);
        cnt++;
        if (cnt === arr.length) {
            clearInterval(timer);
        }
    }, 1000)
}
Print([4, 3, 2, 1], 0);