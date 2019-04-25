/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 获取url后参数
 */
export const GetRequest = () => {
  let url = location.search; //获取url中"?"符后的字串
  let theRequest = new Object();
  if (url.indexOf('?') != -1) {
    let str = url.substr(1);
    let strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = strs[i].split(
        '='
      )[1];
    }
  }
  return theRequest;
};

/**
 * 验证身份证号
 * @param el 号码输入input
 * @returns {boolean}
 */
export const checkCardNo = el => {
  let txtval = el.value;
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(txtval);
};

/**
 * 获取字符串字节长度
 * @param {String}
 * @returns {Boolean}
 */
export const checkLength = v => {
  let realLength = 0;
  let len = v.length;
  for (let i = 0; i < len; i++) {
    let charCode = v.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
};

/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
export const isWeiXin = () => {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
};

/**
 * 写cookies
 */
export const setCookie = (name, value, time) => {
  let strsec = getsec(time);
  let exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);
  document.cookie =
    name +
    '=' +
    escape(value) +
    ';expires=' +
    exp.toGMTString();
};

/**
 * 读取cookies
 */
export const getCookie = name => {
  let arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) return arr[2];
  else return null;
};

/**
 * 删除cookies
 */
export const delCookie = name => {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(name);
  if (cval != null)
    document.cookie =
      name + '=' + cval + ';expires=' + exp.toGMTString();
};

/**
 * 浏览器判断
 * 用法示例——多套页面判断是否显示移动端：
 *   let ua = parseUA();
 *   if (!ua.mobile) {
 *       location.href = './pc.html';
 *   }
 */
export const parseUA = () => {
  let u = navigator.userAgent;
  let u2 = navigator.userAgent.toLowerCase();
  return {
    //移动终端浏览器版本信息
    trident: u.indexOf('Trident') > -1,
    //IE内核
    presto: u.indexOf('Presto') > -1,
    //opera内核
    webKit: u.indexOf('AppleWebKit') > -1,
    //苹果、谷歌内核
    gecko:
      u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
    //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    //ios终端
    android:
      u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    //android终端或uc浏览器
    iPhone: u.indexOf('iPhone') > -1,
    //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1,
    //是否iPad
    webApp: u.indexOf('Safari') == -1,
    //是否web应该程序，没有头部与底部
    iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
    weixin: u2.match(/MicroMessenger/i) == 'micromessenger',
    ali: u.indexOf('AliApp') > -1
  };
};

/**
 * 生成UUID
 * @returns {string}
 */
export const generateUUID = () => {
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
    }
  );
  return uuid;
};

/**
 * 删除左右两端的空格
 * @param str
 * @returns {string | * | void}
 */
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 删除左边的空格
 * @param str
 * @returns {string | * | void}
 */
function ltrim(str) {
  return str.replace(/(^\s*)/g, '');
}

/**
 * 删除右边的空格
 * @param str
 * @returns {string | * | void}
 */
function rtrim(str) {
  return str.replace(/(\s*$)/g, '');
}

/**
 * 判断当前网络环境
 */
export const isWifi = () => {
  try {
    let wifi = true;
    let ua = window.navigator.userAgent;
    let con = window.navigator.connection;
    // 如果是微信
    if (/MicroMessenger/.test(ua)) {
      if (ua.indexOf('WIFI') >= 0) {
        return true;
      } else {
        wifi = false;
      }
      // 如果支持navigator.connection
    } else if (con) {
      let network = con.type;
      if (
        network !== 'wifi' &&
        network !== '2' &&
        network !== 'unknown'
      ) {
        wifi = false;
      }
    }
    return wifi;
  } catch (e) {
    return false;
  }
};

/**
 * 首字母大写
 * @param str
 * @returns {string}
 */
export const fistLetterUpper = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 过滤非法字符串
 */
export const illegalFilter = str => {
  let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
  let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

  if (regEn.test(str) || regCn.test(str)) return false;
  return true;
};
// 验证邮箱
export function isEmail(val) {
  let myreg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/;
  return myreg.test(val);
}
/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();
/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
