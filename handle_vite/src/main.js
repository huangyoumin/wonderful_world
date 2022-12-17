import { str } from './moduleA.js'

// 支持第三方库

import { createApp, h } from 'vue';

const App = {
    render() {
        // <div><div>hello vite</div></div>
        return h('div', null, [h('div', null, String('hello vite'))]);
    }
}

createApp(App).mount('#app');

console.log("vite ...", str);
