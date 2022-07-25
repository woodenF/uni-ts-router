<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title" @click="navigate">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Router from '../../router/router';
const title = ref('Hello')
const router = new Router({ routes: ROUTES });

router.beforeEach((to, from, next) => {
  console.log('beforEach1')
  next();
})
router.beforeEach((to, from, next) => {
  console.log('beforEach2')
  if(to.name !== 'Logs') {
    next({ name: 'Logs' });
  }
  next()
})
router.beforeEach((to, from, next) => {
  console.log('beforEach3')
  next();
})
router.beforeEach((to, from, next) => {
  console.log('beforEach4')
  next();
})

function navigate() {
  router.navigateTo({
    name: 'Test',
    query: {
      a: 1,
      b: 2
    }
  })
}

</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
