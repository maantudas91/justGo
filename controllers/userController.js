const User = require('./../models/User');
const Id = require('valid-objectid');
const utils = require('./../utils/utils');


exports.getUsers = async function(req, res, next) {
    try{
        const query = User.find();
        //query.where('status').equals('active');

        const users = await query.exec();
        return res.status(201).jsonp({'success' : true, 'result': users});
    }catch(err) {
        return res.status(503).jsonp({'error' : err});
    }
}


exports.addUser = function(req, res, next) {
    var user = new User(req.body);
    user.save(function (err, bu) {
            if(err){
         if (err.name === 'ValidationError') return utils.handleValidationError(err, res, true); 
                return res.status(503).jsonp({'error' : err});
            }
            return res.status(201).jsonp({'success' : true});
    });


    // user.save().then(() => {
    //     return user.generateAuthToken();
    //   }).then((token) => {
    //     res.header('x-auth', token).send(user);
    //   }).catch((e) => {
    //     res.status(400).send(e);
    //   })
 }


 exports.getUser = function(req, res,next){
    
 }


exports.login =  function(req, res) {
    var body = req.body;
  
    User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }).catch((e) => {
      res.status(400).send();
    });
};


exports.signup =  function(req, res) {
    let mobile = req.body.mobile;
    //console.log(mobile)
    User.checkUserMobileExists(mobile).then((isExists) => {
        if(isExists){
            return res.status(201).jsonp({'msg' : "User found"});
        }else{
            let user  = new User({'mobile':mobile});
            user.save(function (err, user) {
                if(err){
                    if (err.name === 'ValidationError') return utils.handleValidationError(err, res, true); 
                    return res.status(503).jsonp({'error' : err});
                }
                    
                return user.generateAuthToken().then((token) => {
                    res.header('x-auth', token).send(user);
                });
            });
        }
    });

};




exports.userCheck = function(req, res) {
   if( req.user && req.token){
        return res.status(200).header('x-auth', req.token).send(req.user);
    //return res.status(201).send();
   }
    
}

exports.authenticate = function(req, res, next) {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {

      if (!user) {
        return Promise.reject();
      }
  
      req.user = user;
      req.token = token;
      next();
    }).catch((e) => {
      res.status(401).send();
    });
  }
