const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const Vehicle = require('./Vehicle');

const Address = new Schema({
    address1 : String,
    address2 : String,
    state : String,
    country : String,
    city: String,
    locality : String,
    bu_code  : { type : String, unique : true },
    zip : String,
    landmark1 : String,
    landmark2 : String
});

// brand Schema
const buSchema = mongoose.Schema({
	address : Address,
    loc: {
        type: { type: String , default: 'Point'},
        coordinates: [Number],
    },
    status: { type: String, enum : ['active','inactive'], default: 'active' },
    description : String,
    vehicles : [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }]
},{ collection: 'bu' });

buSchema.plugin(timestamps);
buSchema.index({ "loc": "2dsphere" });

const BU = module.exports = mongoose.model('BU', buSchema);
