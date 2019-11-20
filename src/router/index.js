import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";

import Article from "../views/article/index.vue";
import Category from "../views/category/index.vue";
import Detail from "../views/details/index.vue";
import Page from "../views/page/index.vue";
import Phrase from "../views/phrase/index.vue";
import Search from "../views/search/index.vue";
import Tags from "../views/tags/index.vue";
import ArticleId from "../views/article/_id.vue";
import ArticleIdTitle from "../views/article/_id/_title.vue";
import CategoryId from "../views/category/_id.vue";
import DetialId from "../views/details/_id.vue";
import PageId from "../views/page/_id.vue";
import TagesId from "../views/tags/_id.vue";
import utils from "../utils/utils";

Vue.use(VueRouter);

const routes = [
  {
    path: "/article",
    component: Article,
    name: "article"
  },
  {
    path: "/category",
    component: Category,
    name: "category"
  },
  {
    path: "/details",
    component: Detail,
    name: "details"
  },
  {
    path: "/page",
    component: Page,
    name: "page"
  },
  {
    path: "/phrase",
    component: Phrase,
    name: "phrase"
  },
  {
    path: "/search",
    component: Search,
    name: "search"
  },
  {
    path: "/tags",
    component: Tags,
    name: "tags"
  },
  {
    path: "/article/:id",
    component: ArticleId,
    name: "article-id",
    children: [
      {
        path: ":title?",
        component: ArticleIdTitle,
        name: "article-id-title"
      }
    ]
  },
  {
    path: "/category/:id",
    component: CategoryId,
    name: "category-id"
  },
  {
    path: "/details/:id",
    component: DetialId,
    name: "details-id"
  },
  {
    path: "/page/:id",
    component: PageId,
    name: "page-id"
  },
  {
    path: "/tags/:id",
    component: TagesId,
    name: "tags-id"
  },
  {
    path: "/",
    component: Index,
    name: "index"
  }
];

const scrollBehavior = function(to, from, savedPosition) {
  return {
    x: 0,
    y: 0
  };
};

const router = new VueRouter({
  mode: "history",
  base: decodeURI("/"),
  scrollBehavior,
  routes: routes
});

// router.beforeEach((to, from, next) => {
//   utils.beforeEach(to, from, next);
// });

export default router;
