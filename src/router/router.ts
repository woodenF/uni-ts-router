type Options = Omit<UniNamespace.NavigateToOptions, 'url'> & {
  url?: string;
  name?: string;
  query?: Record<string, any>
}

interface Route {
  url: string;
  name?: string;
  query?: Record<string, any>;
}

interface BeforeEachCallback {
  (to: Route, from: Route, next: (args?: Options) => void): void;
}

export default class Router {
  static beforeEachQueue: BeforeEachCallback[] = [];
  static routes: any[] = [];
  constructor({ routes }: { routes?: any[] }) {
    Router.routes = routes || [];
  }
  async navigate(type: 'navigateTo', options: Options) {
    const { to, from } = this.getFromAndTo(options);
    const query = this.formatQuery(options.query || {});
    const params = {
      ...options,
      url: `${this.getAbsolutePath(to.path)}${query}`,
    }
    await this.next({ to, from });
    return uni[type](params);
  }
  navigateTo(options: Options) {
    return this.navigate('navigateTo', options);
  }

  beforeEach(fn: BeforeEachCallback) {
    Router.beforeEachQueue.push(fn);
  }

  next({ to, from }: { to: Route, from: Route }) {
    let i = 0;
    return new Promise((resolve, reject) => {
      const _next: any = (args?: Options) => {
        if(Object.prototype.toString.call(args) === '[object Object]') {
          this.navigateTo(args as Options);
          return reject('拦截跳转')
        }
        if(args === false) {
          return reject('终止跳转')
        }
        const task = Router.beforeEachQueue[i++];
        if(!task) {
          return resolve(true);
        }
        return new Promise((next) => {
          task(to, from, next);
        }).then(_next).catch(reject);
      }
      _next();
    })
  }

  // 获取目标路由
  getTargetRoute(options: Options) {
    if(options?.url) {
      return Router.routes.find((item) => this.getAbsolutePath(item.path) === this.getAbsolutePath(options.url || ''));
    }
    if(options?.name) {
      return Router.routes.find((item) => item.name === options.name);
    }
    throw '目标路由不存在';
  }

  getFromAndTo(options: Options) {
    const currentPages = getCurrentPages();
    const currentPage = currentPages[currentPages.length - 1];
    const to = this.getTargetRoute(options);
    const from = this.getTargetRoute({ url: currentPage.route })
    return {
      to: {
        ...to,
        ...options
      }, from
    }
  }

  getAbsolutePath(path: string) {
    if(!path) {
      return ''
    }
    if(path.charAt(0) === '/') {
      return path;
    }
    return `/${path}`
  }
  
  // 处理query
  formatQuery(query: Record<string, any>) {
    let str = '';
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const value = query[key];
        str += `${key}=${value}&`
      }
    }
    return str && `?${str.slice(0, -1)}`; 
  }
}