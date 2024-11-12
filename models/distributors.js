const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Distributors = new Schema({
    name: {type: String},

},{
    timestamp: true
})

module.exports = mongoose.model('distributors', Distributors)