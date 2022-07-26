"use strict";
var common_vendor = require("../common/vendor.js");
const ROUTER_KEY = Symbol("router");
function createRouter(options) {
  const { routes } = options;
  const beforeGuards = [];
  function getRoute(options2) {
    if (options2 == null ? void 0 : options2.url) {
      return routes == null ? void 0 : routes.find((item) => getPath(item.path) === getPath(options2.url || ""));
    }
    if (options2.name) {
      return routes == null ? void 0 : routes.find((item) => item.name === options2.name);
    }
  }
  function getPath(path) {
    if (!path)
      return "";
    return path.charAt(0) === "/" ? path : `/${path}`;
  }
  function formatQuery(query) {
    let str = "";
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const value = query[key];
        str += `${key}=${value}&`;
      }
    }
    return str && `?${str.slice(0, -1)}`;
  }
  async function navigate(type, options2) {
    const { to, from } = getToAndFrom(options2);
    const params = {
      ...options2,
      url: `${getPath(to.path)}${formatQuery(options2.query || {})}`
    };
    await next({ to, from });
    return common_vendor.index[type](params);
  }
  function navigateTo(options2) {
    navigate("navigateTo", options2);
  }
  function beforeEach(guard) {
    beforeGuards.push(guard);
  }
  function next({ to, from }) {
    let i = 0;
    return new Promise((resolve, reject) => {
      const _next = (options2) => {
        if (options2 && Object.prototype.toString.call(options2) === "[object Object]") {
          navigateTo(options2);
          return reject("\u62E6\u622A\u8DF3\u8F6C");
        }
        if (options2 === false) {
          return reject("\u7EC8\u6B62\u8DF3\u8F6C");
        }
        const task = beforeGuards[i++];
        if (!task) {
          return resolve(true);
        }
        return new Promise((next2) => {
          task(to, from, next2);
        }).then(_next).catch(reject);
      };
      _next();
    });
  }
  function getToAndFrom(options2) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const to = getRoute(options2);
    const from = getRoute({ url: currentPage.route });
    return {
      to: {
        ...to,
        ...options2
      },
      from
    };
  }
  const router = {
    routes: options.routes,
    navigateTo,
    beforeEach,
    install(app) {
      app.provide(ROUTER_KEY, router);
    }
  };
  return router;
}
function useRouter() {
  return common_vendor.inject(ROUTER_KEY);
}
exports.createRouter = createRouter;
exports.useRouter = useRouter;
