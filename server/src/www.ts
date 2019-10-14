import Koa from 'koa';
import KoaStatic from 'koa-static'
import koaBody from 'koa-body';
import session from 'koa-session'
import apolloServer from './apolloServer';
import router from './router/index'
import path from 'path'
// 初始化mysql连接
import { createPool } from './db/mysql'
createPool();

const app = new Koa();
app.keys = ['hello'];


app
    //随机延迟响应
    .use(async (ctx, next) => {
        await next();
        await delay(Math.random() * 2 * 1000);
    })
    // 支持跨域
    .use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Methods', '*');
        await next();
    })
    // 静态文件
    .use(KoaStatic(path.join(__dirname, '../static')))
    // session 默认一天过期
    .use(session({
        key: 'rtweb:sess',
        maxAge: 86400000,
        renew: true
    }, app));
// body解析
//   .use(koaBody())

// graphql项目
apolloServer.applyMiddleware({ app, path: '/graphql' });
// 普通路由
app
    .use(router.routes())
    .use(router.allowedMethods());

//监听端口
app.listen(3000);


function delay(time: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}

