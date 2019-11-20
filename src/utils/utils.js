function getQueryDiff(toQuery, fromQuery) {
  const diff = {};
  const queries = { ...toQuery, ...fromQuery };
  for (const k in queries) {
    if (String(toQuery[k]) !== String(fromQuery[k])) {
      diff[k] = true;
    }
  }
  return diff;
}

// A noop loading inteterface for when $nuxt is not yet ready
const noopLoading = {
  finish: () => {},
  start: () => {},
  fail: () => {},
  set: () => {}
};

function beforeEach(to, from, next) {
  console.log("beforeEach")
  let $loading = () =>
    window.$app && window.$app.$loading ? window.$app.$loading : noopLoading;

  // Check if route path changed (_pathChanged), only if the page is not an error (for validate())
  let _pathChanged = from.path !== to.path;
  let _queryChanged = JSON.stringify(to.query) !== JSON.stringify(from.query);

  if (_pathChanged) {
    $loading().start();
  }
  // Call next()
  next();
}

function beforeRouteUpdate(Component, watchQuery, to, from, next) {
  let $loading = window.$app.$loading;
  // Check if route path changed (_pathChanged), only if the page is not an error (for validate())
  let _pathChanged = from.path !== to.path;
  let _queryChanged = JSON.stringify(to.query) !== JSON.stringify(from.query);
  let _diffQuery = _queryChanged ? getQueryDiff(to.query, from.query) : [];

  if (_pathChanged && $loading.start && !$loading.manual) {
    Component.fetch({ store: Component.$store, route: to }).then(() => {
      $loading.increase(99);
    });
    $loading.start();
  }

  if (!_pathChanged && _queryChanged) {
    // Add a marker on each component that it needs to refresh or not
    const startLoader = () => {
      if (watchQuery === true) return true;
      if (Array.isArray(watchQuery)) {
        return watchQuery.some(key => _diffQuery[key]);
      }
      return false;
    };
    if (startLoader() && $loading.start && !$loading.manual) {
      Component.fetch({ store: Component.$store, route: to }).then(() => {
        $loading.increase(99);
      });
      $loading.start();
    }
  }

  // Call next()
  next();
}

let utils = {};
utils.beforeRouteUpdate = beforeRouteUpdate;
utils.beforeEach = beforeEach;

export default utils;
