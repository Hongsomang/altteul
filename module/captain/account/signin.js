var express=require('express');
var mysql=require('mysql');
var sql=require('../.././db.js');
var conn=mysql.createConnection(sql);
conn.connect();
exports.signin=function (captain_phonenumber,password,callback) {
    console.log("signin start");
    conn.query('select captain_phonenumber from captain where captain_phonenumber=? and password=? ',[captain_phonenumber,password],function (err,row) {
        if(err){
            console.log(err);
            callback(err,null,null);
            return;
        }
        if(row.length>0){
            callback(null,"good",row);
            return ;
        }


    });
}