var express=require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var mysql=require('mysql');
var dbconfig=require('../db/mysql.js');
var connection=mysql.createConnection(dbconfig);
connection.connect();
/*
   Here we are configuring our SMTP Server details.
   STMP is mail server which is responsible for sending and recieving email.
*/

var smtpTransport = nodemailer.createTransport({
   service: "Gmail",
   auth: {
       user: "ghdthakd12@gmail.com",
       pass: "ghdthakd12"
   }
});
var rand,mailOptions,host,link,code,email;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
router.get('/',function(req,res){
   res.sendfile('index.html');
});

router.get('/send',function(req,res){
       email=req.query.to;
   connection.quer('SLELCT *FORM user WHERE user_email=?',[email],function(err,rows){
       if(rows==null){
               rand=Math.floor((Math.random() * 1000) + 54);
       
       console.log('email:'+email);
   host=req.get('127.0.0.1');
   link="http://"+req.get('host')+"/verify?id="+rand;
   mailOptions={
       to : email,
       subject : "Please confirm your Email account",
       html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
   }
   console.log(mailOptions);
   smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
           console.log(error);
       res.end("error");
    }else{
           console.log("Message sent: " + response.message);
       res.end("sent");
        }
});
       }
       else if(err){
              console.log(err);
           res.status(400).send({
               err:err
           });
           res.end();
       }
       else{
               
           res.status(401).
           .end('overlap');
         
       }
       
});

});

router.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('127.0.0.1'));
if((req.protocol+"://"+req.get('127.0.0.1'))==("http://"+host))
{   code=Math.floor((Math.random() * 1000) + 1000);
   console.log("Domain is matched. Information is from Authentic email");
   if(req.query.id==rand)
   {
       console.log("email is verified");
       res.end("<h1>Email "+mailOptions.to+" is been Successfully verified and your code is "+code);
       console.log("code:"+code);
   }
   else
   {
       console.log("email is not verified");
       res.end("<h1>Bad Request</h1>");
   }
}
else
{
   res.end("<h1>Request is from unknown source");
}
});

router.post('/emailcode',function(req,res){
   console.log('emailcode start');
   if(req.body.emailcode==code){
       res.status(201)
       .end("send");
   }
   else{
       res.status(400)
       .end("error");
   }
});

router.post('/signup',function(req,res){
   var user_name=req.body.nickname;
   var user_pwd=req.body.pwd;
   var user_email=email;
   var token=null;
   var user_image=null;
   connection.query('INSERT INTO user values(?,?,?,?,?)' ,[user_email,user_pwd,user_name,token,user_image],function(err,rows){
       if(err){
             console.log(err);
           res.status(400).send({
               err:err
           });
           res.end();
       }
       else{
              console.log("signin:"+rows);
           res.status(201)
               .end("send");
           
       }
       
       
   });
});


//router.post('/emailco')

/*--------------------Routing Over----------------------------*/

module.exports = router;