let DBUtil = require('./DBUtil');

//查询所有学生的信息
function queryAllStudent(success){
    let querySql = 'select * from student';
    let connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,[],(error,result)=>{
        if(error == null){
            success(result);
        }else {
            throw new Error(error);
        }
    });
    connection.end();
}
//用学号查学生的信息
function queryStudentByStuNum(stuNum,success){
    let querySql = 'select * from student where stu_num = ?;';
    let params = [stuNum];
    let connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,params,(error,result)=>{
        if(error){
            throw new Error(error);
        }else {
            success(result);
        }
    });
    connection.end();
}
//插入一个学生的信息
function insertStudent(stuNum,name,stuClass,age,pwd,success){
    let insertSql = 'insert into student (stu_num, name, class, age, pwd) values (?,?,?,?,?);';
    let params = [stuNum,name,stuClass,age,pwd];
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
    queryAllStudent,
    queryStudentByStuNum,
    insertStudent
};