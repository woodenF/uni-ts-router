"use strict";
var router_router = require("./router.js");
const router = router_router.createRouter({
  routes: [...[{ "path": "pages/index/index", "name": "Home", "style": { "navigationBarTitleText": "uni-app" } }, { "path": "pages/test/index", "name": "Test", "style": { "navigationBarTitleText": "uni-app" } }, { "path": "pages/logs/index", "name": "Logs", "style": { "navigationBarTitleText": "uni-app" } }]]
});
router.beforeEach((to, from, next) => {
  console.log("beforeEach1");
  next();
});
router.beforeEach((to, from, next) => {
  console.log("beforeEach2");
  next();
});
router.beforeEach((to, from, next) => {
  console.log("beforeEach3");
  next();
});
exports.router = router;
