const BU = require('./../models/BU');
const Id = require('valid-objectid');
const utils = require('./../utils/utils');


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