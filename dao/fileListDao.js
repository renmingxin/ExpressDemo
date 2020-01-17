let DBUtil = require('./DBUtil');

function insertFileList(fileName,fileSize,filePath,stuNum,success){
    let insertSql = 'insert into file_list (file_name, file_size, file_path, stu_num) values (?,?,?,?);';
    let params = [fileName,fileSize,filePath,stuNum];
    let connection = DBUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params,(error,result)=>{
        if(error){
            throw new Error(error);
        }else {
            success(result);
        }
    });
    connection.end();
}

module.exports = {
    insertFileList
};