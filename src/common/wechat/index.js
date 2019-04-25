const wx = require('./wechat.js').wx;
const plugin = {
  install(Vue) {
    Vue.prototype.$wechat = wx;
  }
};
export default plugin;
