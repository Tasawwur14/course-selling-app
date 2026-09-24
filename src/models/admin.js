const mongoose = require("mongoose");
const Schema = mongoose.Schema

const adminShema = new Schema({
    username: {type:String, unique:true, required:true},
    password : {type:String, min:6,  required:true},
    timestamps: true
});

const Admin = mongoose.model('Admin', admin);
module.exports = Admin;

