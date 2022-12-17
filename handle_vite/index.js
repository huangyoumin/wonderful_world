const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

app.use(async ctx => {
    
    const { url, query } = ctx.request;

    console.log("==>vite url =", url, query);
    
    // => index.html
    // 遇到'/'，返回首页
    if (url === '/') {
        ctx.type = 'text/html';
        // 同步读取首页内容
        const content = fs.readFileSync('./index.html', 'utf-8');
        ctx.body = content;
    }
    


    // *.js => src/*.js 

    else if (url.endsWith('.js')) {
        // /src/main.js ==> 代码文件所在的位置/src/main.js
        const p = path.resolve(__dirname, url.slice(1)); // 去掉第一个字符'/'
        console.log("===>p", p);
        const content = fs.readFileSync(p, 'utf-8');
        ctx.type = 'application/javascript';
        ctx.body = content;
    }

    // 支持第三方库

    
})


app.listen(3000, () => {
    console.log("vite start at 3000");
    
})