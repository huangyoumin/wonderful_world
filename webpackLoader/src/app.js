import tpl from './info.tpl';

const oApp = document.querySelector("#app");


const info = tpl({
    name: '暴躁老哥',
    age: 17,
    career: 'xxxx',
    hobby: 'every thing'
})

oApp.innerHTML = info;