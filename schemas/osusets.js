const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    userid : String,
    name : String, 
})

module.exports = mongoose.model('osusets', Schema)