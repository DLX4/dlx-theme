<template>
  <div id="app">
    <loading ref="loading"></loading>
    <div
      :class="['menu-mask', menuStatus && 'is-show-menu']"
      @click="_closeMenu"
    ></div>
    <app-header />
    <div :class="['main', menuStatus && 'is-show-menu']">
      <div class="wrap">
        <div class="content">
          <router-view></router-view>
        </div>
        <!-- sidebar start -->
        <app-sidebar class="sidebar-wrap" />
        <!-- sidebar end -->
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import AppSidebar from "../components/AppSidebar";
import Loading from "../components/Loading";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    AppSidebar,
    Loading
  },
  computed: {
    ...mapState(["menuStatus"])
  },
  mounted() {
    window.$loading = this.$refs.loading;
  },
  methods: {
    _closeMenu() {
      this.$store.commit("UPDATE_MENU_STATUS", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variable.scss";
.wrap {
  display: flex;
  justify-content: space-between;
  margin-top: $container-margin;

  // 左边内容容器
  .content {
    width: 900px;
  }

  // 侧边栏
  .sidebar-wrap {
    width: 280px;
  }
}

@media screen and (max-width: 1024px) {
  .wrap {
    .content {
      width: 100%;
    }

    .sidebar-wrap {
      display: none;
    }
  }
}
</style>
