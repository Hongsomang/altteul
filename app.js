var express=require('express');
var app=express();
var http=require('http');
var bodyParser=require('body-parser');
app.set('port',process.env.PORT||2018);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var signup_module=require('./module/worker/account/signup');
//회원가입
app.post('/account/worker/signup',function (req,res) {
    var worker_phonenumber=req.body.worker_phonenumber;
    var first_name=req.body.first_name;
    var last_name=req.body.last_name;
    var name=first_name+last_name;
    var password=req.body.password;
    console.log("회원가입:"+worker_phonenumber+" "+name+""+password);
    signup_module.signin(worker_phonenumber,name,password,function (err,result) {
        if(err){
            console.log(err);
            res.send(400);
        }
        if(result=='good'){
            res.send(200);
        }
        else if(result==null){
            res.send(404);
            console.log("회원가입 실패")
        }
    });
});


app.listen(app.get('port'), function () {
    console.log('Create Server, Port is '+app.get('port'));

});