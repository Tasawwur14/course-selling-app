const mongoose = require("mongoose")

const connectDB = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI)
        console.log("DataBase connected to Mongo-DB")
    }
    catch(error){
        console.log("Connection failed while connecting to Mongo-DB")
        console.log(error);
    }
}
module.exports = connectDB;