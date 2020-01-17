let fileListDao = require('../dao/fileListDao');
let path = new Map();

function upload(request,response){
    let { originalname, size, path } = request.file;
    let stuNum = request.cookies.id ? request.cookies.id : 1;
    fileListDao.insertFileList(originalname, size, path, stuNum,result=>{
        console.log('写入成功');
        response.write(path);
        response.end();
    });
}

path.set('/upload', upload);
module.exports.path = path;