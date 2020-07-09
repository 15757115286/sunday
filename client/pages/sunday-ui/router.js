import DemoHome from './demo';
const demoRoutes = [];
const links = [];

// 第一层的index
const context = require.context('./demo', true, /\.\/[^\/]+\/index.vue$/, 'lazy');
const rootPath = '/sunday-ui';
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

export {
    routes,
    links
}