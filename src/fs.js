const fs = require('fs')
const path = require('path')
const args = process.argv.splice(2);

const paths = args[1]

function mkdirs(dirname, callback) {
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback();
    } else {
      // console.log(path.dirname(dirname));
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback);
        console.log('在' + path.dirname(dirname) + '目录创建好' + dirname  +'目录');
      });
    }
  });
}

const na = mkdirs(paths,()=>{})

console.log(na)

function handleTplString(str,json){
  console.log(json)
  return str.replace(/\{\{MODULES\}\}/g,json.module)
    .replace(/\{\{TITLE\}\}/g,json.title)
    .replace(/\{\{C_TITLE1\}\}/g,json.c_title1)
    .replace(/\{\{C_PATH1\}\}/g,json.c_path1)
    .replace(/\{\{C_TITLE2\}\}/g,json.c_title2)
    .replace(/\{\{C_PATH2\}\}/g,json.c_path2)
    .replace(/\{\{C_TITLE3\}\}/g,json.c_title3)
    .replace(/\{\{C_PATH3\}\}/g,json.c_path3)
}
// node fs.js menu menu/modules/ zis-hello.js "{"module":\"gogogo\","title":\"测试1\","c_title1":\"gogogo1\","c_path1":\"cls\","c_title2":\"gogogo2\","c_path2":\"pls\","c_title3":\"gogogo3\","c_path3":\"gls\"}"
// node fs.js router router/modules/ hello.js "{"module":\"gogogo\","title":\"测试1\","c_title1":\"gogogo1\","c_path1":\"cls\","c_title2":\"gogogo2\","c_path2":\"pls\","c_title3":\"gogogo3\","c_path3":\"gls\"}"

const type = args[0]
function returnTpl(type){
  const prefix = args[1]
  switch (type) {
    case 'menu':
      return prefix+'demo-create-menu.js'
    case 'router':
      return prefix+'demo-create-router.js'
    case 'views':
      return prefix+'demo-create-views.js'
  }
}

function createNewFile(){
  const tpl = returnTpl(type)
  fs.readFile(tpl,function (error,data) {
    if(error){
      console.log(error)
    }else{
      console.log(data.toString())
      const json = eval("("+args[3]+")")
      const string = handleTplString(data.toString(),json)
      fs.writeFile(args[1]+args[2],string,'utf8',function(error){
        if(error){
          console.log(error);
          return false;
        }
        console.log('写入成功');
      })
    }
  })
}

createNewFile()



