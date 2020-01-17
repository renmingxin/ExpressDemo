let url = require('url');

let studentDao = require('../dao/studentDao');

let path = new Map();

function getAllStudent(request,response){
    studentDao.queryAllStudent(result=>{
        response.writeHead(200);
        response.write(JSON.stringify(result));
        response.end();
    });
}

function addStudent(request,response){
    let params = url.parse(request.url, true).query;
    let { stuNum, name, stuClass, age, pwd } = params;
    studentDao.insertStudent(stuNum, name, stuClass, age, pwd,result=>{
        response.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
        response.write('添加成功');
        response.end();
    });
}

function login(request,response){
    let params = url.parse(request.url, true).query;
    let { stuNum } = params;
    studentDao.queryStudentByStuNum(stuNum,result=>{
        console.log(result);
        if (result && result.length > 0 && result[0].pwd === params.pwd){
            //写cookie
            response.cookie('id',result[0].id);
            response.redirect('/api/getAllStudent');
        }else{
            response.redirect('/loginError.html');
        }
    });
}

path.set('/api/getAllStudent',getAllStudent);
path.set('/api/addStudent',addStudent);
path.set('/login',login);

module.exports.path = path;