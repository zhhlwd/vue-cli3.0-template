import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import filters from './filters/index';
// import wechat from '@/common/wechat/index';
// 消除 click 移动浏览器300ms延迟
import attachFastClick from 'fastclick';
attachFastClick.attach(document.body);
import http from '@api/http';
Vue.prototype.$http = http;
// 注入全局过滤器
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item]);
});
// Vue.use(wechat);
// const wx = Vue.$wechat;
// wx.config({
//   appId: '',
//   nonceStr: '',
//   signature: '',
//   timestamp: '',
//   jsApiList: [
//     'onMenuShareTimeline',
//     'onMenuShareAppMessage'
//   ]
// });
Vue.config.productionTip = false;
Vue.config.devtools = true;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
