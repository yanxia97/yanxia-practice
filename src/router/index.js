import { createRouter, createWebHistory } from 'vue-router';

export const children = [];
const directives = import.meta.globEager('../modules/*/route.(js|ts)');
for (const d in directives) {
  const res = directives[d];
  children.push(...res.default);
}

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      name: 'Index',
    },
    {
      path: '/404',
      name: '404',
      meta: {
        title: '找不到页面',
      },
      component: () => import('@/layout/ErrorPage.vue'),
    },
  ],
});
router.beforeEach((to, from, next) => {
  children.forEach((route) => {
    router.addRoute('Index', route);
  });
  // 404页面需要在这里添加，否则刷新就会进入404页面
  router.addRoute({
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  });
  next();
  // 第一次进入的需要重定向到第一个有path的模块
  // if (to.path === '/') {
  //   next('/' + children.filter((f) => !f.meta?.hide)[0].path);
  // } else {
  //   next();
  // }
});

export default router;
