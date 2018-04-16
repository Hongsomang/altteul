var express=require('express');
var mysql=require('mysql');
var sql=require('../.././db.js');
var conn=mysql.createConnection(sql);
conn.connect();
exports.search_workspace=function (work_id,callback) {
    console.log("seach_workspace start");
    conn.query('select * from workspace where work_id=?',[work_id],function (err,row) {
        if(err){
            console.log('err:'+err);
            callback(err,null);
            return;

        }
        if(row!=null){
            callback(null,'good');
            return;
        }
    });

}