import Vue from "vue";
import App from "./layouts/default.vue";
import router from "./router";
import store from "./plugins/store";
import axios from "./plugins/axios";
import "./assets/scss/variable.scss";
import "./assets/scss/global.scss";
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/element-ui";
import "./plugins/message";
import "./plugins/icon";
// import "../node_modules/element-ui/lib/theme-chalk/index.css";
// import "./assets/scss/global.scss";
import global_ from "./Base.vue";
//
//
// Vue.prototype.GLOBAL = global_;
Vue.config.productionTip = false;
// Vue.prototype.$axios = axios;

new Vue({
  el: "#app",
  router: router,
  store: store,
  beforeCreate() {
    store.$router = router;
    store.$axios = axios;
    store.$global = global_;
    store.dispatch("rootStoreInit", { root: true });
  },
  render: h => h(App)
}).$mount("#app");
