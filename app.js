const express=require('express');
const path=require('path');
const publicPath=path.resolve(__dirname,'public');
const session=require('express-session');

const port=3000;
const app=express();
require('./db');

const mongoose=require('mongoose');
const Data=mongoose.model('Data');
const User=mongoose.model('User');
const Message=mongoose.model('Message');

app.set('view engine','hbs');
app.use(express.urlencoded({extended:false}));

app.use(express.static(publicPath));

const sessionOptions={
	secret:'secret for signing session id',
	saveUninitialized:false,
	resave:false
};

app.use(session(sessionOptions));

//const cookieParser=require('cookie-parser');

//app.use(cookieParser());

app.use(function(req,res,next){
	console.log(req.method," ",req.path);
	console.log("=====");
	console.log("req.query: ",req.query);
	console.log("req.body: ", req.body);
	next();

});






app.listen(port);
