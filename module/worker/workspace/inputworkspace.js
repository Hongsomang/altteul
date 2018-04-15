var express=require('express');
var mysql=require('mysql');
var sql=require('../.././db.js');
var conn=mysql.createConnection(sql);
conn.connect();
exprot.inputworkspace=function (start_work_save,finish_work_save,day_save,workspace_work_id,worker_phonenumber,callback) {
    console("inputworkspace start");
    conn.query('insert into work_time_save(start_work_save,finish_work_save,day_save,workspace_work_id,worker_phonenumber) values (?,?,?,?,?)',[start_work_save,finish_work_save,day_save,workspace_work_id,worker_phonenumber],function (err,row) {
       if(err){
           console.log(err);
           callback(err,null);
           return;
       }
       if(row.length==1){
           console.log("성공"+row);
           callback(null,"good");
           return;
       }
    });
}