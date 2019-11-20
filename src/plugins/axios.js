import Axios from "axios";

// Axios.prototype cannot be modified
const axiosExtra = {
  setHeader(name, value, scopes = "common") {
    for (let scope of Array.isArray(scopes) ? scopes : [scopes]) {
      if (!value) {
        delete this.defaults.headers[scope][name];
        return;
      }
      this.defaults.headers[scope][name] = value;
    }
  },
  setToken(token, type, scopes = "common") {
    const value = !token ? null : (type ? type + " " : "") + token;
    this.setHeader("Authorization", value, scopes);
  },
  onRequest(fn) {
    this.interceptors.request.use(config => fn(config) || config);
  },
  onResponse(fn) {
    this.interceptors.response.use(response => fn(response) || response);
  },
  onRequestError(fn) {
    this.interceptors.request.use(
      undefined,
      error => fn(error) || Promise.reject(error)
    );
  },
  onResponseError(fn) {
    this.interceptors.response.use(
      undefined,
      error => fn(error) || Promise.reject(error)
    );
  },
  onError(fn) {
    this.onRequestError(fn);
    this.onResponseError(fn);
  }
};

// Request helpers ($get, $post, ...)
for (let method of [
  "request",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "patch"
]) {
  axiosExtra["$" + method] = function() {
    return this[method].apply(this, arguments).then(res => {
      // console.log(res)
      return res;
    });
  };
}

const extendAxiosInstance = axios => {
  for (let key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios);
  }
};

const setupProgress = axios => {
  // A noop loading inteterface for when $app is not yet ready
  const noopLoading = {
    finish: () => {},
    start: () => {},
    fail: () => {},
    set: () => {}
  };

  const $loading = () =>
    window.$app.$loading ? window.$app.$loading : noopLoading;

  let currentRequests = 0;

  axios.onRequest(config => {
    if (config.method === "get") {
      config.data && (config.progress = config.data.progress);
      config.data = null;
    } else {
      let contentType = config.headers["Content-Type"];
      if (contentType && contentType.indexOf("multipart/form-data") === -1) {
        let data = {};
        for (let [key, value] of Object.entries(config.data)) {
          key !== "progress" && (data[key] = value);
        }
        config.data = data;
      }
      config.progress = config.headers.progress;
      delete config.headers.progress;
    }

    // return config;
    if (config && config.progress === false) {
      return;
    }

    currentRequests++;
  });

  axios.onResponse(response => {
    if (response && response.config && response.config.progress === false) {
      return;
    }
    currentRequests--;
    if (currentRequests <= 0) {
      currentRequests = 0;
      $loading().finish();
    }
  });

  axios.onError(error => {
    if (error && error.config && error.config.progress === false) {
      return;
    }

    currentRequests--;
    $loading().fail();
    $loading().finish();
  });

  const onProgress = e => {
    if (!currentRequests) {
      return;
    }
    if (e.total === 0) {
      return;
    }
    const progress = (e.loaded * 100) / (e.total * currentRequests);
    $loading().set(Math.min(100, progress));
  };

  axios.defaults.onUploadProgress = onProgress;
  axios.defaults.onDownloadProgress = onProgress;
};

// Create new axios instance
let axios = Axios.create();

// Extend axios proto
extendAxiosInstance(axios);

// Setup interceptors
setupProgress(axios);

export default axios;
