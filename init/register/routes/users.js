var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const crypto = require('crypto');


var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'mapping',
  password: '123456',
  port: '3306',
  database: 'mapping',
});
connection.connect();

function query(sql, res, req) {
  connection.query(sql, function (err, result) {
    if (err) {
      res.send({msg:'错误信息：'+err.message,ret:201});
      return;
    }
    let len = result.length
    if (len != 0) {
      res.send({msg:'错误信息：用户已存在',ret:201})
    } else {
      // add(req)
      add(req,res)
    }

  });
}

function add(req,res) {
  console.log(req.body)
  let {
    telphone,
    password,
    name
  } = req.body
  const md5 = crypto.createHash('md5');
  md5.update(password)
  var sign = md5.digest('hex');
  var addSql = 'INSERT INTO tbl_user(name,telphone,username,password,relStatus,status) VALUES(?,?,?,?,?,1)';
  var addSqlParams = [name, telphone, telphone, sign, 1];
  //增
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      res.send({msg:'错误信息：'+err.message,ret:201});
      return;
    }
    res.send({msg:'ok',ret:200})
  });
}
/* GET users listing. */
router.post('/', async (req, res, next) => {
  let {
    telphone,
    password,
    name
  } = req.body
  if(telphone===''){
    res.send({msg:'错误信息：电话号码为空',ret:201});
  }
  if(password===''){
    res.send({msg:'错误信息：密码为空',ret:201});
  }
  if(name===''){
    res.send({meg:'错误信息：姓名为空',ret:201});
  }
  var sql = `SELECT * FROM tbl_user WHERE username = ${telphone}`;

  query(sql, res,req)
});

module.exports = router;
