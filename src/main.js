import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store/index';
import 'amfe-flexible';
import { Button, Popup, Swipe, SwipeItem, TreeSelect, PullRefresh, Notify } from 'vant';
import { axios, Request } from "@/utils/request";

let req = new Request();
Vue.use(Swipe).use(SwipeItem).use(Button).use(Popup).use(TreeSelect).use(PullRefresh).use(Notify);
Vue.config.productionTip = false;
Vue.prototype.$get = req.get;
Vue.prototype.$post = req.post;
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
