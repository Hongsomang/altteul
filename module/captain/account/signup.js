var express=require('express');
var mysql=require('mysql');
var sql=require('../.././db.js');
var conn=mysql.createConnection(sql);
conn.connect();
exports.signup=function (captain_phonenumber,name,password,callback) {
    console.log("signup start");
    conn.query('insert into captain(captain_phonenumber,name,password) values (?,?,?)',[captain_phonenumber,name,password],function (err,row) {
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