import Prism from "prismjs";

const VuePrism = {
  install(Vue, options) {
    Vue.mixin({
      updated() {
        Prism.highlightAll();
      }
    });
  }
};

export default VuePrism;
