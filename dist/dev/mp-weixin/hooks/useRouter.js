"use strict";
var common_vendor = require("../common/vendor.js");
function useRouter() {
  var _a;
  return (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.appContext.config.globalProperties.$Router;
}
exports.useRouter = useRouter;
