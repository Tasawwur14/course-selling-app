const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true, uniqure: true },
    password: { type: String, required: true, min: 8 },
    purchasedCourses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'course'
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User ;