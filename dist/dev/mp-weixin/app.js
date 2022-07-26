"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var common_vendor = require("./common/vendor.js");
var router_index = require("./router/index.js");
require("./router/router.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/test/index.js";
  "./pages/logs/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    common_vendor.onLaunch(() => {
      console.log("App Launch");
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide1");
    });
    return () => {
    };
  }
});
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/Local/Uniapp/uni-ts-router/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App).use(router_index.router);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
