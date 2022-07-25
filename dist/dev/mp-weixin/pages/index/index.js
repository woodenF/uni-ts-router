"use strict";
var common_vendor = require("../../common/vendor.js");
var router_router = require("../../router/router.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const title = common_vendor.ref("Hello");
    const router = new router_router.Router({ routes: [{ "path": "pages/index/index", "name": "Home", "style": { "navigationBarTitleText": "uni-app" } }, { "path": "pages/test/index", "name": "Test", "style": { "navigationBarTitleText": "uni-app" } }, { "path": "pages/logs/index", "name": "Logs", "style": { "navigationBarTitleText": "uni-app" } }] });
    router.beforeEach((to, from, next) => {
      console.log("beforEach1");
      next();
    });
    router.beforeEach((to, from, next) => {
      console.log("beforEach2");
      if (to.name !== "Logs") {
        next({ name: "Logs" });
      }
      next();
    });
    router.beforeEach((to, from, next) => {
      console.log("beforEach3");
      next();
    });
    router.beforeEach((to, from, next) => {
      console.log("beforEach4");
      next();
    });
    function navigate() {
      router.navigateTo({
        name: "Test",
        query: {
          a: 1,
          b: 2
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(title.value),
        b: common_vendor.o(navigate)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/Local/Uniapp/uni-vite-template/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
