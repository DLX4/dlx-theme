import Vue from "vue";
import App from "./layouts/default.vue";
import router from "./router";
import store from "./plugins/store";
import "./assets/scss/variable.scss";
import "./plugins/element-ui";
import "./plugins/message";
import "./plugins/icon";
// import "../node_modules/element-ui/lib/theme-chalk/index.css";
// import "./assets/scss/global.scss";

import global_ from "./Base.vue";
Vue.prototype.GLOBAL = global_;

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router: router,
  store: store,
  created() {
    console.log(store);
    store.dispatch("nuxtServerInit").then(() => {
      console.log("-----------------------------------")
    });
  },
  render: h => h(App)
}).$mount("#app");
