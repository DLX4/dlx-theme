import {
  UPDATE_ARTICLE_LIST,
  INIT_ARTICLE_OTHERINFO,
  SET_ARTICLE_DETAIL,
  SET_TOTAL_PAGE,
  SET_CURRENT_PAGE,
  UPDATE_VIEW_COUNT,
  UPDATE_OPINION,
  UPDATE_OPINION_LOADING
} from "./mutations-types";

export const state = () => ({
  articleList: [],
  detail: {
    date: "",
    title: {},
    articleInfor: { tags: {}, nextLink: {}, prevLink: {}, other: {} },
    content: {}
  },
  totalPage: 0,
  currentPage: 1,
  viewCount: 0,
  fullPath: "",
  rewardContent: {},
  posterContent: {},
  authorOtherInfo: {
    github: {
      icon: "#icon-GitHub"
    },
    qq: {
      icon: "#icon-qq1"
    },
    wechatNum: {
      icon: "#icon-weixin5"
    },
    sina: {
      icon: "#icon-xinlang1"
    },
    email: {
      icon: "#icon-youxiang"
    }
  },
  opinion: {
    very_good: {
      src: require("../assets/images/like_love.png"),
      isShowLaoding: false,
      text: "Love"
    },
    good: {
      src: require("../assets/images/like_haha.png"),
      isShowLaoding: false,
      text: "Haha"
    },
    commonly: {
      src: require("../assets/images/like_wow.png"),
      isShowLaoding: false,
      text: "Wow"
    },
    bad: {
      src: require("../assets/images/like_sad.png"),
      isShowLaoding: false,
      text: "Sad"
    },
    very_bad: {
      src: require("../assets/images/like_angry.png"),
      isShowLaoding: false,
      text: "Angry"
    }
  }
});

export const mutations = {
  [UPDATE_ARTICLE_LIST](state, data) {
    state.articleList = data;
  },

  [INIT_ARTICLE_OTHERINFO](
    state,
    fullPath,
    rewardContent,
    posterContent,
    authorOtherInfo
  ) {
    state.fullPath = fullPath;
    state.rewardContent = rewardContent;
    state.posterContent = posterContent;
    state.authorOtherInfo = authorOtherInfo;
  },

  [SET_ARTICLE_DETAIL](state, data) {
    state.detail = data;
  },

  [SET_TOTAL_PAGE](state, n) {
    state.totalPage = n;
  },

  [SET_CURRENT_PAGE](state, n) {
    state.currentPage = n;
  },

  [UPDATE_VIEW_COUNT](state, n) {
    state.viewCount = n;
  },

  [UPDATE_OPINION](state, data) {
    Object.keys(state.opinion).map(key => {
      state.opinion[key].data = data[key];
    });
  },

  [UPDATE_OPINION_LOADING](state, { key, flag }) {
    state.opinion[key].isShowLaoding = flag;
  }
};

export const actions = {
  // 获取文章列表
  async getArticleList({ rootState, commit }, requestData) {
    try {
      let { data, headers } = await this.$axios.$get(
        `${this.$constant.BASE_URL}/wp-json/wp/v2/posts`,
        {
          params: requestData,
          data: { progress: false }
        }
      );
      data.map(item => {
        item.articleInfor.thumbnail = item.articleInfor.thumbnail
          ? item.articleInfor.thumbnail.replace(
              /https?:\/\/(\w+\.)+\w+(:\d+)?/,
              ""
            )
          : rootState.info.thumbnail;
        item.date = item.date.replace("T", " ");
      });
      commit(UPDATE_ARTICLE_LIST, data);
      commit(SET_TOTAL_PAGE, +headers["x-wp-total"]);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // 获取文章详情
  async getArticleDetail({ commit, rootState }, id) {
    try {
      const domainRegexp = /(https?:\/\/([a-z\d-]\.?)+(:\d+)?)?(\/.*)/gi;
      let { data } = await this.$axios.$get(
        `${this.$constant.BASE_URL}/wp-json/wp/v2/posts/${id}`,
        {
          data: { progress: false }
        }
      );
      data.date = data.date.replace("T", " ");
      data.articleInfor.other.authorPic = data.articleInfor.other.authorPic.replace(
        domainRegexp,
        "$4"
      );
      data.articleInfor.thumbnail = data.articleInfor.thumbnail
        ? data.articleInfor.thumbnail.replace(domainRegexp, "$4")
        : rootState.info.thumbnail;
      commit(SET_ARTICLE_DETAIL, data);
      commit(UPDATE_OPINION, data.articleInfor.xmLike);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // 更新阅读量
  async updateArticleViewCount({ commit }, requestData) {
    try {
      let { data } = await this.$axios.$post(
        `${this.$constant.BASE_URL}/wp-json/xm-blog/v1/view-count`,
        requestData,
        {
          headers: {
            progress: false
          }
        }
      );
      commit(UPDATE_VIEW_COUNT, data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // 发表意见
  async updateOpinion({ commit }, requestData) {
    try {
      let { data } = await this.$axios.$post(
        `${this.$constant.BASE_URL}/wp-json/xm-blog/v1/like`,
        requestData,
        {
          headers: {
            progress: false
          }
        }
      );
      commit(UPDATE_OPINION, data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // 初始化其它信息： fullPath, rewardContent，posterContent，authorOtherInfo
  async initArticleOtherInfo({ rootState, state, commit }, id, path) {
    let fullPath = `${rootState.info.domain.replace(/\/$/, "")}${path}`;

    let other = state.detail.articleInfor.other;

    // 合并作者数据
    let authorOtherInfo = state.authorOtherInfo;
    for (let key in state.authorOtherInfo) {
      authorOtherInfo[key].url = other[key];
    }

    // 打赏数据
    let rewardContent = {
      thumbnail: state.detail.articleInfor.other.authorPic,
      text: rootState.info.rewardText,
      alipay: rootState.info.alipay,
      wechatpay: rootState.info.wechatpay
    };

    // 海报内容
    let posterContent = {
      //TODO
      // imgUrl: this.$store.state.article.detail.articleInfor.thumbnail,
      imgUrl:
        "http://106.54.113.128/wordpress/wp-content/uploads/2019/10/create_thumb-5.png",
      title: state.detail.title.rendered,
      summary: state.detail.articleInfor.summary,
      time: state.detail.date.replace(/\s.*/, " "),
      // TODO
      qrcodeLogo:
        "http://106.54.113.128/wordpress/wp-content/uploads/2019/10/create_thumb-5.png",
      // qrcodeLogo: this.$store.state.article.detail.articleInfor.other.authorPic.replace(
      //   /(https?:\/\/([a-z\d-]\.?)+(:\d+)?)?(\/.*)/gi,
      //   `${this.info.domain}$4`
      // ),
      qrcodeText: rootState.info.blogName,
      id: id
    };

    commit(
      INIT_ARTICLE_OTHERINFO,
      fullPath,
      rewardContent,
      posterContent,
      authorOtherInfo
    );
  }
};
