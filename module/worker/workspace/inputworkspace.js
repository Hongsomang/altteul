var express=require('express');
var mysql=require('mysql');
var sql=require('../.././db.js');
var conn=mysql.createConnection(sql);
conn.connect();
exports.inputworkspace=function (start_work_save,finish_work_save,day_save,workspace_work_id,worker_phonenumber,callback) {
    console.log("inputworkspace start");
    conn.query('insert into work_time_save(start_work_save,finish_work_save,day_save,workspace_work_id,worker_phonenumber) values (?,?,?,?,?)',[start_work_save,finish_work_save,day_save,workspace_work_id,worker_phonenumber],function (err,row) {
      console.log('ddd'+row);
       if(err){
           console.log(err);
           callback(err,null);
           return;
       }
       if(row.length>0){
           console.log("성공"+row);
           callback(null,'good');
           return;
       }
    });
}