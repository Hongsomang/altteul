var express=require('express');
var mysql=require('mysql');
var sql=require('../.././db.js');
var conn=mysql.createConnection(sql);
conn.connect();
exports.list=function (workspace_work_id,callback) {
    console.log('inputworkspace_list_module start');
    conn.query('select *from work_time_save where workspace_work_id=?;',[workspace_work_id],function (err,rows) {
       if(err){
           console.log(err);
           callback(err,null,null);
           return;
       }
       if(rows!=null){
           console.dir(rows);
           callback(err,'good',rows.toString());
           return;
       }
    });

}