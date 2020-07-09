const routes = [];
const links = [];

// 第一层的index
const context = require.context('./demo', true, /\.\/[^\/]+\/index.vue$/, 'lazy');
context.keys().forEach(dir => {
    const paths = dir.split('/');
    const link = `/${ paths[1] }`;
    links.push(link);
    routes.push({
        path: link,
        component: () => import(
            /* webpackChunkName: "sunday-chunks/[request]" */
            `./demo/${ paths[1] }`
        )
    });
});

routes.push({
    path:'/',
    redirect:'/home'
},{
    path:'*',
    redirect:'/home'
});

export {
    routes,
    links
}