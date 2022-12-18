import { str } from './moduleA.js'

// 支持第三方库

import { createApp, h } from 'vue';
import App from './App.vue';
import "./index.css";

createApp(App).mount('#app');

console.log("vite ...", str);
