import DemoHome from './demo';
const demoRoutes = [];
const links = [];

const config = {
  tag: '标签',
  button: '按钮',
  input: '输入框',
  icon: '图标',
  upload: '上传（部分）',
  select: '选择框（部分）'
};

// 第一层的index
const context = require.context('./demo', true, /\.\/[^/]+\/index.(vue|tsx)$/, 'lazy');
const rootPath = '/ui';
context.keys().forEach(dir => {
  const paths = dir.split('/');
  const link = `${rootPath}/${paths[1]}`;
  links.push(link);
  demoRoutes.push({
    path: link,
    component: () => import(
      /* webpackChunkName: "sunday-chunks/[request]" */
      `./demo/${paths[1]}`
    )
  });
});

const routes = [
  {
    path: '/sunday-ui',
    component: DemoHome,
    children: demoRoutes
  }
];

routes.push({
  path: '/',
  redirect: links[0]
}, {
  path: '*',
  redirect: links[0]
});

const nameMap = {};
Object.keys(config).forEach(name => {
  nameMap[`${rootPath}/${name}`] = config[name];
});

export {
  routes,
  links,
  nameMap
};
