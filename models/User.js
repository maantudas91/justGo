const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');


// brand Schema
const userSchema = mongoose.Schema({
    name : String,
    email : { type: String},
    password : String,
    mobile : { type : Number, unique : true},
    status: { type: String, enum : ['active','inactive'], default: 'active' },
    licence_verified : { type: String, enum : ['yes','no'], default: 'no' },
    photo : String,
    licence_front : String,
    licence_back : String,
    tokens: [{
        access: {
          type: String
        },
        token: {
          type: String
        }
      }]
},{ collection: 'users' });

userSchema.plugin(timestamps);


// userSchema.methods.toJSON = function () {
//     var user = this;
//     var userObject = user.toObject();
  
//     return _.pick(userObject, ['_id', 'email']);
// };

userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens.push({access, token});
  
    return user.save().then(() => {
      return token;
    });
};


userSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    
    try {
      decoded = jwt.verify(token, 'abc123');
    } catch (e) {
      return Promise.reject();
    }
  
    return User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
};

userSchema.statics.findByCredentials = function (email, password) {
    var User = this;
  
    return User.findOne({email}).then((user) => {
      if (!user) {
        return Promise.reject();
      }
  
      return new Promise((resolve, reject) => {
        // Use bcrypt.compare to compare password and user.password
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    });
};

/*****Find User by Mobile number*** */
userSchema.statics.checkUserMobileExists = function (mobile) {
  var User = this;

  return User.findOne({mobile}).then((user) => {
    if (!user) {
      return false;
    }
    return user;
   
  });
};

userSchema.pre('save', function (next) {
    var user = this;
  
    if (user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
});

const User = module.exports = mongoose.model('User', userSchema);
