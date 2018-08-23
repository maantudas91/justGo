var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DEV_URL = 'mongodb://localhost:27017/justgo';
const PROD_URL= 'mongodb://maantudas:password123@ds233208.mlab.com:33208/supermarket';

if(process.env.NODE_ENV != 'production'){
	mongoose.connect(DEV_URL, { useNewUrlParser: true });
}else{
	mongoose.connect(PROD_URL);
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  console.log("mongodb connected..!!");
});