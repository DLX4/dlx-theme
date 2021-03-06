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
import Constant from "./Constant.vue";
import Loading from "./components/Loading";
import utils from "./utils/utils";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router: router,
  store: store,
  beforeCreate() {
    store.$router = router;
    store.$axios = axios;
    store.$constant = Constant;
    store.$utils = utils;
    store.dispatch("rootStoreInit", { root: true });
  },
  mounted() {
    this.$loading = this.$refs.loading;
  },
  created() {
    window.$app = this;
  },
  render: h => {
    const loadingEl = h("Loading", { ref: "loading" });
    const layoutEl = h(App);
    const templateEl = h(
      "div",
      {
        domProps: {
          id: "__layout"
        },
        key: "default"
      },
      [layoutEl]
    );

    return h(
      "div",
      {
        domProps: {
          id: "__nuxt"
        }
      },
      [loadingEl, templateEl]
    );
  },
  components: {
    Loading
  }
});
