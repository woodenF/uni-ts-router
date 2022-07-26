import { App, inject } from 'vue';
const ROUTER_KEY = Symbol('router');
interface Router {
  routes?: any[];
  beforeEach(guard: BeforeGuard): void;
  navigateTo(options: RouteOptions): void;
  install(app: App): void;
}
interface RouterOptions {
  routes?: any[]
}

type RouteOptions = Omit<UniNamespace.NavigateToOptions, 'url'> & {
  url?: string;
  name?: string;
  query?: Record<string, any>;
}

interface BeforeGuard {
  (to: any, from: any, next: (options?: RouteOptions | boolean) => void): void
}

export function createRouter(options: RouterOptions) {
  const { routes } = options;
  const beforeGuards: BeforeGuard[] = [];

  // 在当前路由中找到对应路由
  function getRoute(options: RouteOptions) {
    if(options?.url) {
      return routes?.find((item) => getPath(item.path) === getPath(options.url || ''));
    }
    if(options.name) {
      return routes?.find((item) => item.name === options.name);
    }
  }

  // 转换路由路径
  function getPath(path: string) {
    if(!path) return '';
    return path.charAt(0) === '/' ? path : `/${path}`
  }

  // 处理跳转参数
  function formatQuery(query: Record<string, any>) {
    let str = '';
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const value = query[key];
        str += `${key}=${value}&`
      }
    }
    return str && `?${str.slice(0, -1)}`; 
  } 

  // 跳转页面
  async function navigate(
    type: 'navigateTo' | 'redirectTo' | 'switchTab' | 'navigateBack',
    options: RouteOptions
  ) {
    const { to, from } = getToAndFrom(options);
    const params = {
      ...options,
      url: `${getPath(to.path)}${formatQuery(options.query || {})}`
    }
    await next({ to, from });
    return uni[type](params as any);
  }

  function navigateTo(options: RouteOptions) {
    navigate('navigateTo', options);
  }


  function beforeEach(guard: BeforeGuard) {
    beforeGuards.push(guard);
  }

  function next({ to, from }: any) {
    let i = 0;
    return new Promise((resolve, reject) => {
      const _next: any = (options?: RouteOptions | boolean) => {
        if(options && Object.prototype.toString.call(options) === '[object Object]') {
          navigateTo(options as RouteOptions);
          return reject('拦截跳转')
        }
        if(options === false) {
          return reject('终止跳转')
        }
        const task = beforeGuards[i++];
        if(!task) {
          return resolve(true)
        }
        return new Promise((next) => {
          task(to, from, next);
        }).then(_next).catch(reject);
      }
      _next();
    })
  }

  // 获取路由跳转目标页面和当前页面
  function getToAndFrom(options: RouteOptions) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const to = getRoute(options);
    const from = getRoute({ url: currentPage.route })
    return {
      to: {
        ...to,
        ...options
      },
      from
    }
  }

  const router: Router = {
    routes: options.routes,
    navigateTo,
    beforeEach,
    install(app) {
      app.provide(ROUTER_KEY, router)
    }
  }
  return router;
}

export function useRouter() {
  return inject(ROUTER_KEY) as Router;
}
