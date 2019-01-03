const express=require('express');
const path=require('path');
const publicPath=path.resolve(__dirname,'public');
const session=require('express-session');

//const port=3000;
const app=express();
require('./db');
const auth=require('./auth');
const passport=require('passport');

const mongoose=require('mongoose');
const Data=mongoose.model('Data');
//const User=mongoose.model('User');
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

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
	res.locals.user=req.user;
	req.session.saveThis=0;
	next();
});

//const cookieParser=require('cookie-parser');

//app.use(cookieParser());

app.use(function(req,res,next){
	console.log(req.method," ",req.path);
	console.log("=====");
	console.log("req.query: ",req.query);
	console.log("req.body: ", req.body);
	next();
});


app.use(function(req,res,next){
	Data.find(function(err,datas,count){
		if(datas.length===0){
			const d=new Data({website_id:123,
				visited:0,
				messages:0});
			d.save(function(err,saveData,saveCount){
					next();
			});
		}else if(datas.length>1){
			console.log('multiple data saved');
			next();
		}else{
			next();
		}
	});
});



app.get('/', (req, res) => {
  Message.find({display:true,secret:false},function(err,messages,count){
			Data.findOne({website_id:123},function(err,data,count){
				data.visited=data.visited+1;
				const visitNum=data.visited;
				const messageNum=data.messages;
				data.save(function(err,saveData,saveCount){
					const context={
						visited:visitNum,
						messageNum:messageNum,
						messages:messages
					};
					res.render('index',context);
				});
			});
  });
});

app.get('/add',(req,res)=>{
	Message.find(function(err,messages,count){
		const sessionOnlyMessages=messages.filter(mes=>mes.session_id===req.session.id);
		const context={
			sessionOnlyMessages:sessionOnlyMessages
		};
		if(sessionOnlyMessages.length===0){
			context.empty=true;
		}

		res.render('add',context);
  });
});

app.post('/add',(req,res)=>{
	Message.find({session_id:req.session.id},function(err,messages,count){
	const context={
		sessionOnlyMessages:messages
	};
	if(messages.length===0){
		context.empty=true;
	}
	if(req.body.name===''){
		console.log("empty name");
		context.message="Name cannot be empty";
		res.render('add',context);
		return;
	}else if(req.body.email===''){
			console.log("empty email");
			context.message="Email cannot be empty";
			res.render('add',context);
			return;
	}else if(req.body.content===''){
		console.log('empty content');
		context.message="Content cannot be empty";
		res.render('add',context);
		return;
	}
		const currentDate = new Date();
		const date = currentDate.getDate();
		const month = currentDate.getMonth(); //Be careful! January is 0 not 1
		const year = currentDate.getFullYear();
		const dateString = year + "-" +(month + 1) + "-" + date;
		const m=new Message({
			name: req.body.name,
			display:false,
			email: req.body.email,
			secret: req.body.secret,
			text: req.body.content,
			createdAt: dateString,
			session_id: req.session.id});
		m.save(function(err,saveData,saveCount){
			Data.findOne({website_id:123},function(err,data,count){
				data.messages=data.messages+1;
				data.save(function(err,saveData,saveCount){
					res.redirect('/add');
				});
			});

		});
	});

});

app.get('/manage',(req,res)=>{
		if(req.user===undefined){
			res.redirect('/login');
		}else{
			Message.find(function(err,messages,count){
				const context={
					messages:messages
				};
				res.render('manage',context);
			});
		}
});

app.post('/delete',(req,res)=>{
		Message.findOne({slug:req.body.stuff}).remove(function(err,data,count){
			res.redirect('/manage');
		});
});

app.post('/display',(req,res)=>{
	Message.findOne({slug:req.body.stuff},function(err,message,count){
		message.display=true;
		message.save(function(err,message,count){
			res.redirect('/manage');
		});
	});
});

app.post('/cancelDisplay',(req,res)=>{
	Message.findOne({slug:req.body.stuff},function(err,message,count){
		message.display=false;
		message.save(function(err,message,count){
			res.redirect('/manage');
		});
	});
});

app.get('/login',(req,res)=>{
	res.render('login');
});

app.get('/register',(req,res)=>{
	res.redirect('/');
});

app.post('/register',(req,res)=>{
	function success(user){
		res.redirect('/manage');
	}
	function error(errObj){
		res.render('register',errObj);
	}
	auth.register(req.body.username,req.body.password,error,success,req,res);
});

app.post('/login',(req,res)=>{
	function success(user){
		req.logIn(user,function(err){
			res.redirect('/manage');
		});
	}
	function error(errObj){
		res.render('login',errObj);
	}
	auth.login(success,error,req,res);
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(process.env.PORT||3000);
