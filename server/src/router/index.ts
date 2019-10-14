import Router from 'koa-router'
import path from 'path'
import fs from 'fs'
const router = new Router();

// 后台html
router.get('/admin/*', ctx => {
    let filePath = path.join(__dirname, '../../static/admin/index.html');
    ctx.type = 'html';
    ctx.body = fs.createReadStream(filePath);
});

//首页
router.get('/*', ctx => {
    ctx.type = 'html';
    ctx.body = '<h1>RT首页</H1>';
});
export default router;