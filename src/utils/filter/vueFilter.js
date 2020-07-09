import Vue from 'vue';
function initFilter() {
  //日期格式化
  Vue.filter("date",function(v){
    var date = new Date(v);
    return formatDate(date, "yyyy-MM-dd");
  });
  //时间格式化
  // Vue.filter("time",function(v){
  //   var date = new Date(v);
  //   return formatDate(date, "yyyy-MM-dd hh:mm:ss");
  // });
  Vue.filter("time",function(v){
    if(v== '' || v== null) return v
    let _v = v
    let newV = v.toString()
    if(newV.length == 10){
      _v = parseInt(newV)*1000
    }
    var date = new Date(_v);
    return formatDate(date, "yyyy-MM-dd hh:mm");
  });
  //设置默认值
  Vue.filter("default",function (v,d) {
    if(v == "" || v == null){
      return d;
    }else{
      return v;
    }
  });
  //时间比较（大于）当前时间
  Vue.filter("timeGt", function(v){
    var date = formatDate(new Date(v), "yyyy-MM-dd hh:mm");
    var nowDate = formatDate(new Date(), "yyyy-MM-dd hh:mm");
    if(date > nowDate){
      return true;
    }else{
      return false;
    }
  });
  //时间比较（小于）当前时间
  Vue.filter("timeLt", function(v){
    var date = formatDate(new Date(v), "yyyy-MM-dd hh:mm");
    var nowDate = formatDate(new Date(), "yyyy-MM-dd hh:mm");
    if(date < nowDate){
      return true;
    }else{
      return false;
    }
  });
  //时间比较 a > b = true
  Vue.filter("timeAgtB", function(a,b){
    var dateA = formatDate(new Date(a), "yyyy-MM-dd hh:mm");
    var dateB = formatDate(new Date(b), "yyyy-MM-dd hh:mm");
    if(dateA > dateB){
      return true;
    }else{
      return false;
    }
  });
  Vue.filter("html",function(content){
    var string = content;
    try{
      string=string.replace(/\r\n/g,"<br>")
      string=string.replace(/\n/g,"<br>");
    }catch(e) {
      alert(e.message);
    }
    return string;
  });
}

function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

//VUE中标签内判断无法调用filter方法，所以这里使用全局方法
//时间比较（大于）当前时间
function vueTimeGt(v){
  var date = formatDate(new Date(v), "yyyy-MM-dd hh:mm");
  var nowDate = formatDate(new Date(), "yyyy-MM-dd hh:mm");
  if(date > nowDate){
    return true;
  }else{
    return false;
  }
}

//时间比较（小于）当前时间
function vueTimeLt(v){
  var date = formatDate(new Date(v), "yyyy-MM-dd hh:mm");
  var nowDate = formatDate(new Date(), "yyyy-MM-dd hh:mm");
  if(date < nowDate){
    return true;
  }else{
    return false;
  }
}

//时间比较 a > b = true
function vueTimeAgtB(a,b){
  var dateA = formatDate(new Date(a), "yyyy-MM-dd hh:mm");
  var dateB = formatDate(new Date(b), "yyyy-MM-dd hh:mm");
  if(dateA > dateB){
    return true;
  }else{
    return false;
  }
}

export default initFilter
