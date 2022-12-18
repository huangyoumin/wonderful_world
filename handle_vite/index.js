const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const compilerSfc = require("@vue/compiler-sfc");
const compilerDom = require("@vue/compiler-dom");
const app = new Koa();

app.use(async ctx => {

    const { url, query } = ctx.request;


    // => index.html
    // 遇到'/'，返回首页
    if (url === '/') {

        ctx.type = 'text/html';
        // 同步读取首页内容
        let content = fs.readFileSync('./index.html', 'utf-8');

        // 加入环境变量process
        content = content.replace('<script', `<script>
        window.process = {env: { NODE_ENV: 'dev'}}
        </script>
        <script`)

        ctx.body = content;
    }

    // *.js => src/*.js 

    else if (url.endsWith('.js')) {
        // /src/main.js ==> 代码文件所在的位置/src/main.js
        const p = path.resolve(__dirname, url.slice(1)); // 去掉第一个字符'/'
        const content = fs.readFileSync(p, 'utf-8');
        ctx.type = 'application/javascript';
        //如果是第三方库，就改写成了请求/@module/xxx
        ctx.body = reWriteImport(content);
    }

    // 支持第三方库

    else if (url.startsWith('/@modules')) {

        // /@modules/vue => 代码的位置 node_modules/vue 的 es 模块入口
        const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@modules/', ''))

        // 读取packages.json的module属性，得到 "dist/vue.runtime.esm-bundler.js"
        const module = require(prefix + '/package.json').module;

        const p = path.resolve(prefix, module);

        const ret = fs.readFileSync(p, 'utf-8');


        ctx.type = 'application/javascript';
        // 递归导入所有的第三方库
        ctx.body = reWriteImport(ret);

    }

    // 支持VUE单文件组件
    // *.vue => template

    else if (url.indexOf('.vue') > -1) {
        // 第一步：.vue文件 => template script  （compile-sfc）

        const p = path.resolve(__dirname, url.split('?')[0].slice(1));
        const content = compilerSfc.parse(fs.readFileSync(p, 'utf-8'));

        // descriptor.script => js + template生成render部分

        const { descriptor } = content;
        // console.log("===>compiler content ", descriptor);


        if (!query.type) {
            ctx.type = 'application/javascript'
            ctx.body = `${reWriteImport(descriptor.script.content.replace("export default", "const __script = "))};
            import { render as __render } from "${url}?type=template";
            __script.render = __render;
            export default __script;
            `
        } else {
            // 第二步：模版 => render函数        （compiler-dom）
            const template = descriptor.template;
            const render = compilerDom.compile(template.content, { mode: 'module' });
            ctx.type = 'application/javascript'
            ctx.body = reWriteImport(render.code);
        }
    }

    // css 文件

    else if (url.endsWith('.css')) {
        // 把css转换成js代码
        // 利用js 添加一个style标签

        const p = path.resolve(__dirname, url.slice(1));
        const file = fs.readFileSync(p, 'utf-8');

        const content = `
        const css = "${file.replace(/\n/g, "")}"
        let link = document.createElement('style')
        link.setAttribute('type', 'text/css')
        document.head.appendChild(link)
        link.innerHTML = css
        export default css
        `

        ctx.type = 'application/javascript';
        ctx.body = content;
    }

    // 改写函数
    // 'vue' => '/@modules/vue' => 别名
    // from 'xxx'

    function reWriteImport(content) {
        return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
            if (s1[0] !== '.' && s1[1] !== '/') { // import的不是绝对路径或相对路径
                return `from '/@modules/${s1}'`
            } else return s0;
        })
    }


})


app.listen(3000, () => {
    console.log("vite start at 3000");

})