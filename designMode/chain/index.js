// 职责链模式

// const upload = () => {
//     if (currentEnvCanUseHTML5Form()) {
//         return runHTML5Form();
//     }
//     if (currentEnvCanUseFlash()) {
//         // 当前环境支持flash
//         return runFlashUpload();
//     } 
// }


function useHTML5Form(obj) {
    if (currentEnvCanUseHTML5Form()) {
        return runHTML5Form();
    }
    return 'next'
}

function useFlash(obj) {
    if (currentEnvCanUseFlash()) {
        // 当前环境支持flash
        return runFlashUpload();
    }
    return 'next'
}

const createChain = (nextFn) => {
    Function.prototype.chain = () => {
        const self = this

        return () => {
            const result = self.apply(this, arguments)
            if (result === 'next') {
                return nextFn.apply(this, arguments)
            }
            return result;
        }
    }
}

createChain()

let upload = useFlash.chain(useHTML5Form);
upload({ info: 'info' });