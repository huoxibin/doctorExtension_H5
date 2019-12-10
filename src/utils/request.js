import axios from "axios";
// import qs from "qs";
import router from "@/router";
import store from "@/store";
// import { Message } from "element-ui";

//http request 拦截器
axios.interceptors.request.use(
  config => {
    //debugger
    // config.headers.version = process.env.VUE_APP_VERSION;
    config.params.version = process.env.VUE_APP_VERSION;
    // if (store.getters.accessToken) {
    //   config.headers.accessToken = store.getters.accessToken;
    //   config.headers.userId = store.getters.userId;
    // }
    return config;
  },
  err => {
    // Message({
    //   message: "加载超时",
    //   type: "info",
    //   center: true
    // });
    // console.log("加载超时");
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    const config = response.config;
    switch (response.data.state) {
      case 4011: //token过期
        store.dispatch("ChangeToken").then(state => {
          if (state === 0) {
            router.go(0);
            return axios(config);
          } else {
            router.replace({
              path: "/login"
            });
          }
        });
        break;
      case 401: // token错误
      case 4013: //用户被禁用
      case 1003: //刷新token过期
        store.dispatch("LoginOut").then(() => {
          router.replace({
            path: "/login"
          });
        });
        break;
    }
    return response;
  },
  error => {
    // Message({
    //   message: "请求失败",
    //   type: "info",
    //   center: true
    // });
    // console.log("请求失败");
    
    return Promise.reject(error.response.data);
  }
);

// const get = function(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(url, {
//         params: params
//       })
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };

// const post = function(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, data).then(
//       response => {
//         resolve(response.data);
//       },
//       err => {
//         reject(err);
//       }
//     );
//   });
// };

class Request{
  constructor(){}
  post(url, data = {}){
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      )     
    })
  }
  get(url, params = {}){
    return new Promise((resolve, reject) => {
      axios.get(url,{
        params: params
      }).then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err);
      })
    })
  }
}

// export { axios, post, Get };
// export { axios, qs, get, post };
// export { axios, get, post, Request };
export { axios, Request };
