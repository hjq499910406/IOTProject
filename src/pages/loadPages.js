// auto load to generate components map
export const pages = import.meta.glob('./**/*.vue');

// add to route
// 目前没有生产场景
export const loadDynamicPages = (router, appCode) => {
  // TODO 根据接口获取到页面路由数据，再把组件模块组合进数据里，
  // 接口路由信息中找不到本地文件的时候，即视为无效路由，舍弃
};

// load all pages for development
export const loadDevPages = (router, appCode) => {
  Object.entries(pages).forEach(pageDef => {
    const [ pagePath, pageModule ] = pageDef;
    //console.log('pageModule', pagePath, pageModule);

    // 例【./pages/page-name/page-name.vue】
    const pageName = pagePath.split('/')[ 1 ];

    const routeOption = {
      path: `/${ appCode }/${ pageName }`,
      component: pageModule.default || pageModule // 将vue文件解析为组件的对象
    };
    router.addRoute(routeOption);
  });
  //console.log('routes', router.getRoutes());
};