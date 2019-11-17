import {
  UPDATE_GLOBAL_INFO,
  UPDATE_ERROR_MESSAGE,
  UPDATE_MENU_STATUS
} from "./mutations-types";

export const state = () => ({
  info: { domain: "", banner: {} },
  menu: {},
  subMenu: {},
  links: [],
  errorInformation: {
    code: "",
    message: ""
  },
  menuStatus: false
});

export const mutations = {
  [UPDATE_GLOBAL_INFO](state, { info, menu, subMenu, links }) {
    state.info = info;
    state.menu = menu;
    state.subMenu = subMenu;
    state.links = links;
  },

  [UPDATE_ERROR_MESSAGE](state, data) {
    state.errorInformation = data;
  },

  [UPDATE_MENU_STATUS](state, flag) {
    state.menuStatus = flag;
  }
};

export const actions = {
  // 获取公用信息
  async rootStoreInit({ commit }) {
    try {
      let { data: globalInfo } = await this.$axios.$get(
        `${this.$global.BASE_URL}/wp-json/xm-blog/v1/info`
      );
      let { data: menu } = await this.$axios.$get(
        `${this.$global.BASE_URL}/wp-json/xm-blog/v1/menu`
      );
      let { data: links } = await this.$axios.$get(
        `${this.$global.BASE_URL}/wp-json/xm-blog/v1/get-links`
      );
      // 判断banner类型
      if (globalInfo.banner.style === "1") {
        globalInfo.banner.big = globalInfo.banner.list[0];
        let [, banner1, banner2, banner3] = globalInfo.banner.list;
        globalInfo.banner.small = [banner1, banner2, banner3];
      }
      let result = {
        info: globalInfo,
        menu: menu.mainMenu,
        subMenu: menu.subMenu,
        links
      };
      commit(UPDATE_GLOBAL_INFO, result);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // 上传图片
  // eslint-disable-next-line no-unused-vars
  async uploadImage({ commit, rootState }, { requestData, config = {} }) {
    try {
      let { data } = await this.$axios.$post(
        `${this.$global.BASE_URL}/wp-content/themes/${rootState.info.themeDir}/xm_upload.php`,
        requestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            progress: false
          },
          ...config
        }
      );
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // 删除图片
  // eslint-disable-next-line no-unused-vars
  async deleteImage({ commit, rootState }, requestData) {
    try {
      let { data } = await this.$axios.$post(
        `${this.$global.BASE_URL}/wp-content/themes/${rootState.info.themeDir}/xm_upload.php`,
        requestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            progress: false
          }
        }
      );
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
