var express=require('express');
var mysql=require('mysql');
var sql=require('../.././db.js');
var conn=mysql.createConnection(sql);
conn.connect();
exports.signin=function (work_phonenumber,name,password,callback) {
    console.log("signup start");
    conn.query('insert into worker(worker_phonenumber,name,password) values (?,?,?)',[work_phonenumber,name,password],function (err,row) {
        if(err){
            console.log(err);
            callback(err,null);
            return;
        }
        else {
            console.log("signin:"+row);
            callback(null,"good");
            return;
        }
    });


}