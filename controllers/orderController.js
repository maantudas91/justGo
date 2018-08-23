const Order = require('./../models/Order');
const Id = require('valid-objectid');
const utils = require('./../utils/utils');


exports.getOrders = async function(req, res, next) {
    try{
        const query = Order.find();
        //query.where('status').equals('active');

        const orders = await query.exec();
        return res.status(201).jsonp({'success' : true, 'result': orders});
    }catch(err) {
        return res.status(503).jsonp({'error' : err});
    }
}


exports.newOrder = function(req, res, next) {
    var order = new Order(req.body);
    order.save(function (err, or) {
            if(err){
                if (err.name === 'ValidationError') 
                    return utils.handleValidationError(err, res, true); 
                return res.status(503).jsonp({'error' : err});
            }
            return res.status(201).jsonp({'success' : true});
    });
 }