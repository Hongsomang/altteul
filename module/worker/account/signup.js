var express=require('express');
var mysql=require('mysql');
var sql=require('../.././db.js');
var conn=mysql.createConnection(sql);
conn.connect();
exports.signup=function (work_phonenumber,name,password,callback) {
    console.log("signup start");
    conn.query('insert into worker(worker_phonenumber,name,password) values (?,?,?)',[work_phonenumber,name,password],function (err,row) {
        if(err){
            console.log(err);
            callback(err,null);
            return;
        }
        if(row.length=1) {
            console.log("signup:"+row);
            callback(null,"good");
            return;
        }

    });


}