var express=require('express');
var mysql=require('mysql');
var sql=require('../.././db.js');
var conn=mysql.createConnection(sql);
conn.connect();
exports.list=function (worker_phonenumber,callback) {
    console.log('inputworkspace_list_module start');
    conn.query('select *from workspace_time_save where worker_phonenumber=?',[worker_phonenumber],function (err,rows) {
       if(err){
           console.log(err);
           callback(err,null,null);
           return;
       }
       if(row!=null){
           console.log('row'+rows);
           callback(err,'good',rows);
           return;
       }
    });

}