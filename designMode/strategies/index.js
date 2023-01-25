// 策略模式
// 将通用函数，相同接口进行提取和封装

const strategies = {
    'S': (salary) => {
        return salary * 4;
    },
    'A': (salary) => {
        return salary * 3;
    },
    'B': (salary) => {
        return salary * 2;
    }
}

const calculatorBons = (level, salary) => {
    return strategies[level](salary);
}