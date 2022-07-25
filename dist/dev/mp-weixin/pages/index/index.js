"use strict";
var common_vendor = require("../../common/vendor.js");
var hooks_useRouter = require("../../hooks/useRouter.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const title = common_vendor.ref("Hello");
    const router = hooks_useRouter.useRouter();
    function navigate() {
      router.navigateTo({
        name: "Test",
        query: {
          a: 1,
          b: 3
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
