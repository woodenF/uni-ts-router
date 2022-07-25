"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var common_vendor = require("../common/vendor.js");
const _Router = class {
  constructor({ routes }) {
    _Router.routes = routes || [];
  }
  async navigate(type, options) {
    const { to, from } = this.getFromAndTo(options);
    const query = this.formatQuery(options.query || {});
    const params = {
      ...options,
      url: `${this.getAbsolutePath(to.path)}${query}`
    };
    await this.next({ to, from });
    return common_vendor.index[type](params);
  }
  navigateTo(options) {
    return this.navigate("navigateTo", options);
  }
  beforeEach(fn) {
    _Router.beforeEachQueue.push(fn);
  }
  next({ to, from }) {
    let i = 0;
    return new Promise((resolve, reject) => {
      const _next = (args) => {
        if (Object.prototype.toString.call(args) === "[object Object]") {
          this.navigateTo(args);
          return reject("\u62E6\u622A\u8DF3\u8F6C");
        }
        if (args === false) {
          return reject("\u7EC8\u6B62\u8DF3\u8F6C");
        }
        const task = _Router.beforeEachQueue[i++];
        if (!task) {
          return resolve(true);
        }
        return new Promise((next) => {
          task(to, from, next);
        }).then(_next).catch(reject);
      };
      _next();
    });
  }
  getTargetRoute(options) {
    if (options == null ? void 0 : options.url) {
      return _Router.routes.find((item) => this.getAbsolutePath(item.path) === this.getAbsolutePath(options.url || ""));
    }
    if (options == null ? void 0 : options.name) {
      return _Router.routes.find((item) => item.name === options.name);
    }
    throw "\u76EE\u6807\u8DEF\u7531\u4E0D\u5B58\u5728";
  }
  getFromAndTo(options) {
    const currentPages = getCurrentPages();
    const currentPage = currentPages[currentPages.length - 1];
    const to = this.getTargetRoute(options);
    const from = this.getTargetRoute({ url: currentPage.route });
    return {
      to: {
        ...to,
        ...options
      },
      from
    };
  }
  getAbsolutePath(path) {
    if (!path) {
      return "";
    }
    if (path.charAt(0) === "/") {
      return path;
    }
    return `/${path}`;
  }
  formatQuery(query) {
    let str = "";
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const value = query[key];
        str += `${key}=${value}&`;
      }
    }
    return str && `?${str.slice(0, -1)}`;
  }
};
let Router = _Router;
__publicField(Router, "beforeEachQueue", []);
__publicField(Router, "routes", []);
exports.Router = Router;
