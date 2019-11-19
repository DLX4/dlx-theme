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
import "prismjs/themes/prism.css";
import constant from "./Constant.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router: router,
  store: store,
  beforeCreate() {
    store.$router = router;
    store.$axios = axios;
    store.$constant = constant;
    store.dispatch("rootStoreInit", { root: true });
  },
  render: h => h(App)
}).$mount("#app");
