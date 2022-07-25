import { createRouter } from "./router";

export const router = createRouter({
  routes: [...ROUTES]
});

router.beforeEach((to, from, next) => {
  console.log('beforeEach1');
  next();
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach2');
  next();
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach3');
  next();
})