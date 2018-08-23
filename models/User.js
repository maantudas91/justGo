const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');



// brand Schema
const userSchema = mongoose.Schema({
    name : String,
    email : { type: String, unique : true },
    phone : { type : Number, unique : true},
    status: { type: String, enum : ['active','inactive'], default: 'active' },
    licence_verified : { type: String, enum : ['yes','no'], default: 'no' },
    photo : String,
    licence_front : String,
    licence_back : String
},{ collection: 'users' });

userSchema.plugin(timestamps);

const User = module.exports = mongoose.model('User', userSchema);