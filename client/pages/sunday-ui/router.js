import DemoHome from './demo';
const demoRoutes = [];
const links = [];

const config = {
    button: '按钮组件',
    input: '输入框组件',
    icon: '图标组件',
    upload : '上传组件（部分）'
}

// 第一层的index
const context = require.context('./demo', true, /\.\/[^\/]+\/index.vue$/, 'lazy');
const rootPath = '/ui';
context.keys().forEach(dir => {
    const paths = dir.split('/');
    const link = `${ rootPath }/${ paths[1] }`;
    links.push(link);
    demoRoutes.push({
        path: link,
        component: () => import(
            /* webpackChunkName: "sunday-chunks/[request]" */
            `./demo/${ paths[1] }`
        )
    });
});

const routes = [
    {
        path:'/sunday-ui',
        component: DemoHome,
        children: demoRoutes
    }
];

routes.push({
    path:'/',
    redirect:links[0]
},{
    path:'*',
    redirect:links[0]
});

const nameMap = {};
Object.keys(config).forEach(name => {
    nameMap[`${ rootPath }/${name}`] = config[name];
})

export {
    routes,
    links,
    nameMap
}