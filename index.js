let express = require('express');
let cookie = require('cookie-parser');
let multer = require('multer');

let globalConfig = require('./config');
let loader = require('./loader');

let app = new express();
//上传到file文件夹里
let uploadSingle = multer({dest:'./file/'});

app.use(express.static('page'));
app.use(cookie());

//拦截器
// app.get('/api/*',(request, response, next)=>{
//     if (request.cookies.id){//如果没有id就重定向到login.html页面
//         next();
//     }else {
//         response.redirect('/login.html')
//     }
// });

// app.get('/getAllStudent',loader.get('/getAllStudent'));
// app.get('/addStudent',loader.get('/addStudent'));
// app.get('/getPicture',loader.get('/getPicture'));
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
for (let [k,v] of loader){
    app.get(k,v);
}

app.post('/upload',uploadSingle.single('file'), loader.get('/upload'));


app.listen(globalConfig['port'],()=>{console.log('现在你可以访问12306啦')});

