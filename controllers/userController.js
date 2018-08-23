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
    // user.save(function (err, bu) {
    //         if(err){
    //      if (err.name === 'ValidationError') return utils.handleValidationError(err, res, true); 
    //             return res.status(503).jsonp({'error' : err});
    //         }
    //         return res.status(201).jsonp({'success' : true});
    // });


    user.save().then(() => {
        return user.generateAuthToken();
      }).then((token) => {
        res.header('x-auth', token).send(user);
      }).catch((e) => {
        res.status(400).send(e);
      })
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
