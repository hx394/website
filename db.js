const mongoose=require('mongoose');

//my schema goes here!
const messageSchema= new mongoose.Schema({
  name: String,
  email: String,
  secret: Boolean,
  text: String,
  createdAt: String,
  session_id: String
});

mongoose.model('Message',messageSchema);

const userSchema= new mongoose.Schema({
  username:String,
  hash: String
});

mongoose.model('User',userSchema);

const dataSchema= new mongoose.Schema({
  website_id: Number,
  visited: Number,
  messages: Number
});

mongoose.model('Data',dataSchema);

mongoose.connect('mongodb://localhost/finalProject');
