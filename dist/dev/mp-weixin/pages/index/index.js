"use strict";
var common_vendor = require("../../common/vendor.js");
var router_router = require("../../router/router.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const title = common_vendor.ref("Hello");
    const router = router_router.useRouter();
    console.log("2123131", router_router.useRouter());
    function navigate() {
      router.navigateTo({
        name: "PagesATest"
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/Local/Uniapp/uni-ts-router/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
