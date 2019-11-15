import Vue from "vue";
import VueRouter from "vue-router";
// import Category from "../views/Category.vue";
import Index from "../views/index.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/article",
  //   component: _76fc4435,
  //   name: "article"
  // }, {
  //   path: "/category",
  //   component: _2ddb816a,
  //   name: "category"
  // }, {
  //   path: "/details",
  //   component: _d7bfd12e,
  //   name: "details"
  // }, {
  //   path: "/page",
  //   component: _41b10c9a,
  //   name: "page"
  // }, {
  //   path: "/phrase",
  //   component: _5027f320,
  //   name: "phrase"
  // }, {
  //   path: "/search",
  //   component: _5c40e421,
  //   name: "search"
  // }, {
  //   path: "/tags",
  //   component: _14d5c0d0,
  //   name: "tags"
  // }, {
  //   path: "/article/:id",
  //   component: _cc706046,
  //   name: "article-id",
  //   children: [{
  //     path: ":title?",
  //     component: _7da09736,
  //     name: "article-id-title"
  //   }]
  // }, {
  //   path: "/category/:id",
  //   component: _e3a4cf1a,
  //   name: "category-id"
  // }, {
  //   path: "/details/:id",
  //   component: _77223fde,
  //   name: "details-id"
  // }, {
  //   path: "/page/:id",
  //   component: _376d6d82,
  //   name: "page-id"
  // }, {
  //   path: "/tags/:id",
  //   component: _4d7db738,
  //   name: "tags-id"
  // },
  {
    path: "/",
    component: Index,
    name: "index"
  }
];

const router = new VueRouter({
  routes
});

export default router;
