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

let axios;
// Create new axios instance
axios = Axios.create();

// Extend axios proto
extendAxiosInstance(axios);

export default axios;
