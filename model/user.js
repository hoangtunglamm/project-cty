var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const userModel = new Schema({
    adminname: String,
    password: String
})
module.exports = mongoose.model('admin', userModel)