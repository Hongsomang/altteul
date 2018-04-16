var express=require('express');
var app=express();
var http=require('http');
var bodyParser=require('body-parser');
var websoket=require('ws').Server;
app.set('port',process.env.PORT||2018);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var worker_signup_module=require('./module/worker/account/signup');
var worker_signin_module=require('./module/worker/account/signin');
var captain_signup_module=require('./module/captain/account/signup');
var captain_signin_module=require('./module/captain/account/signin');
var captain_inputworkspace_module=require('./module/captain/workspace/inputworkspace');
var worker_inputworkspace_module=require('./module/worker/workspace/inputworkspace');
var workspace_search_module=require('./module/worker/workspace/workspace_search');
var inputworkspace_list_module=require('./module/worker/workspace/inputworkspace_list');
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

        }
    });
});
//사장 가게 추가
app.post('/work/captain/inputworkspace',function (req,res) {
    var work_id=req.body.workid;
    var workaddress=req.body.workaddress;
    var captain_phonenumber=req.body.captain_phonenumber;
    console.log("사업장 입력:"+work_id+" "+workaddress+" "+captain_phonenumber);
    capt1ain_inputworkspace_module.inputworkspace(work_id,workaddress,captain_phonenumber,function (err,result) {
        console.log("result:"+result);
        if(err){
            console.log(err);
            res.status(400);
            res.end();
        }
        if(result=='good'){
            res.status(201);
            res.end("성공");
        }
        else if(result==null){
            res.status(404);
            res.end("실패");
        }

    });

});
//알바 근무지 추가
app.post('/work/worker/inputworkspace',function (req,res) {
    var start_work_save=req.body.starkwork;
    var finsish_work_save=req.body.finishwork;
    var  workspace_work_id=req.body.workid;
    var day_save=req.body.day_save;
    var worker_phonenumber=req.body.work_phonenumber;
    console.log('inputworkspace:'+start_work_save+' '+finsish_work_save+' '+day_save+' '+worker_phonenumber+' '+workspace_work_id);
    worker_inputworkspace_module.inputworkspace(start_work_save,finsish_work_save,day_save,worker_phonenumber,workspace_work_id,function (err,result) {
        console.log("result:"+result);
        if(err){
            console.log(err);
            res.status(400);
            res.end();
        }
        if(result=='good'){
            res.status(201);
            res.end('성공');
        }
        else if(result==null){
            res.status(404);
            res.end('실패');
        }
    });


});
//근무지 검색
app.post('/work/worker/workspace_search',function (req,res) {
    var work_id=req.body.workid;
    console.log('workspace_search:'+work_id);
    workspace_search_module.search_workspace(work_id,function (err,result) {
        console.log("result:"+result);
        if(err){
            console.log(err);
            res.status(400);
        }
        if(result=='good'){
            res.status(201);
            res.end('성공');
        }
        else if(result==null){
            res.status(404);
            res.end('실패, 없는 가게');
        }

    });
});
app.post('/work/worker/inputworkspace_list',function (req,res) {
    var worker_phonenumber=req.body.work_phonenumber;
    console.log('inputworkspace_list:'+worker_phonenumber);
    inputworkspace_list_module.list(worker_phonenumber,function (err,result,rows) {
       console.log('result:'+result);
       if(err){
           console.log(err);
           res.status(400);
       }
       if(result=='good'){
           res.status(201).send(rows);
           res.end(rows);
       }
       else if(result==null){
           res.status(200);
           res.end('없음');
       }
    });

})
app.listen(app.get('port'), function () {
    console.log('Create Server, Port is '+app.get('port'));

});