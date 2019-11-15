import Vue from "vue";
import App from "./layouts/default.vue";
import router from "./router";
import store from "./plugins/store";
import "./assets/scss/variable.scss";
// import "../node_modules/element-ui/lib/theme-chalk/index.css";
// import "./assets/scss/global.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
