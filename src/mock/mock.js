const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceData = function(opt) {
  console.log('opt', opt);
  let articles = [];
  for (let i = 0; i < 30; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), // Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage(
        '300x250',
        'mock的图片'
      ), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    articles.push(newArticleObject);
  }
  return {
    data: articles
  };
};

let arr = [];

for (let i = 0; i < 30; i++) {
  let newArticleObject = {
    name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
    content: Random.csentence(5, 30), // Random.csentence( min, max )
    id: i
  };
  arr.push(newArticleObject);
}
let list = function(options) {
  /*模拟删除数据的方式*/
  let rtype = options.type.toLowerCase(); //获取请求类型
  switch (rtype) {
    case 'get':
      break;
    case 'post':
      let id = parseInt(JSON.parse(options.body).params.id); //获取删除的id
      // let index;
      // for (let i in arr) {
      //   if (arr[i].id === id) { //在数组arr里找到这个id
      //     index = i
      //     break;
      //   }
      // }
      // arr.splice(index, 1) //把这个id对应的对象从数组里删除
      arr = arr.filter(function(val) {
        return val.id != id;
      });
      break;

    default:
  }

  return {
    data: arr
  }; //返回这个数组,也就是返回处理后的假数据
};

Mock.mock('/list', /get|post/i, list);
Mock.mock('/news', /post|get/i, produceData);
