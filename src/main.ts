import { createSSRApp } from "vue";
import App from "./App.vue";
import Router from "./router/router";

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
