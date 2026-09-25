const mongoose = require("mongoose")
const Schema = mongoose.Schema

const courseSchema = new Schema ({
    title: String, 
    description: String, 
    imageLink : String , 
    price : Number, 
    isPublished: Boolean
})

const Course = mongoose.model('Course',courseSchema)

module.exports = Course ;