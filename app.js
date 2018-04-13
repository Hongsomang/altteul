var express=require('express');
var app=express();
var http=require('http');
var bodyParser=require('body-parser');
app.set('port',process.env.PORT||2018);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var worker_signup_module=require('./module/worker/account/signup');
var worker_signin_module=require('./module/worker/account/signin');
var captain_signup_module=require('./module/captain/account/signup');
var captain_signin_module=require('./module/captain/account/signin');
//var inputworkspace=require('./workspace/inputworkspcace');
//worker회원가입
app.post('/account/worker/signup',function (req,res) {
    var worker_phonenumber=req.body.work_phonenumber;
    var first_name=req.body.firstname;
    var last_name=req.body.lastname;
    var name=first_name+last_name;
    var password=req.body.password;
    console.log("회원가입:"+worker_phonenumber+" "+name+" "+password);
    worker_signup_module.signup(worker_phonenumber,name,password,function (err,result) {
        if(err){
            console.log(err);
            res.send(400);
            res.end();

        }
        if(result=='good'){
            console.log("성공");
            res.status(201);
            res.end();

        }
        else if(result==null){
            res.status(404);
            console.log("회원가입 실패");
            res.end();

        }
    });
});
//worker로그인
app.post('/account/worker/signin',function (req,res) {
    var worker_phonenumber=req.body.work_phonenumber;
    var password=req.body.password;
    console.log("로그인:"+worker_phonenumber+" "+password);
    worker_signin_module.signin(worker_phonenumber,password,function (err,result,row) {
        console.log('result:'+result);
        if(err){
            console.log(err);
            res.status(400);
            res.end();

        }
        if(result=='good'){
            res.status(201).send(row);
            res.end();

        }
        else if(result=='not'){
            res.status(404);
            res.end("not");
        }
    });

});
//captain 회원가입
app.post('/account/captain/signup',function (req,res) {
    var captain_phonenumber=req.body.captain_phonenumber;
    var first_name=req.body.firstname;
    var last_name=req.body.lastname;
    var name=first_name+last_name;
    var password=req.body.password;
    console.log("회원가입:"+captain_phonenumber+" "+name+" "+password);
    captain_signup_module.signup(captain_phonenumber,name,password,function (err,result) {
        if(err){
            console.log(err);
            res.send(400);
            res.end();

        }
        if(result=='good'){
            res.status(201).end('성공');
            res.end();

        }
        else if(result==null){
            res.status(404).end('실패');
            res.end();

            console.log("회원가입 실패")
        }
    });
});
//captain 회원가입
app.post('/account/captain/signin',function (req,res) {
    var captain_phonenumber=req.body.captain_phonenumber;
    var password=req.body.password;
    console.log('로그인:'+captain_phonenumber+" "+password);
    captain_signin_module.signin(captain_phonenumber,password,function (err,result,row) {
        console.log('result:'+result);
        if(err){
            console.log(err);
            res.status(400);
            res.end();

        }
        if(result=='good'){
            res.status(201).send(row);
            res.end();

        }
        else if(result=='not'){
            res.status(404);
            res.end("not");
            res.end();

        }
    });
});
/*app.post('/work/captain/inputworkspace',function (req,res) {
    var work_id=req.body.workid;
    var workadress=req.body.workadress;

})*/
app.listen(app.get('port'), function () {
    console.log('Create Server, Port is '+app.get('port'));

});