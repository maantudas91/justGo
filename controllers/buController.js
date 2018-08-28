const BU = require('./../models/BU');
const Id = require('valid-objectid');
const utils = require('./../utils/utils');
const _ = require('lodash');


exports.getBUs = async function(req, res, next) {
    try{
        const query = BU.find();
        //query.where('status').equals('active');

        const bus = await query.exec();
        return res.status(201).jsonp({'success' : true, 'result': bus});
    }catch(err) {
        return res.status(503).jsonp({'error' : err});
    }
}


exports.addBU = function(req, res, next) {
    
    var bu = new BU(req.body);
    bu.save(function (err, bu) {
            if(err){
         if (err.name === 'ValidationError') return utils.handleValidationError(err, res, true); 
                return res.status(503).jsonp({'error' : err});
            }
            return res.status(201).jsonp({'success' : true});
    });
 }



 exports.editBU = function(req,res){
    let buid = req.params.buid;
    //checking valid objectID
    if (!Id.isValid(buid)) {
        return res.status(403).jsonp({'success' : false, msg: 'Something wrong happend.Please try again'});
    }else{
        let reqBody = req.body;
        let checkId  = reqBody.hasOwnProperty('_id') && (reqBody._id == buid);

        if(!checkId){
            return res.status(403).jsonp({'success' : false, msg: 'Something wrong happend.Please try again'});
            
        }else{
            let buID = reqBody._id;
            delete reqBody._id;
            let query = BU.update({ _id: buID}, { $set: reqBody});
            query.exec(function(err, bu){
                if(err)
                    return res.status(403).jsonp({'success' : false, err});
                return res.status(200).jsonp({'success' : true, bu}); 
            })
        }
        
    }
 }
