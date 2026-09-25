const express = require("express")
const User = require("../models/user")
const app = express();


app.use(express.json())

app.post("/signup", async (req, res)=>{
    const username = req.body.username 
    const password = req.body.password
    const findUser = await User.findOne({
        username: username
    })
    if(!findUser){
       await User.create({
            username : username,
            password : password
        })
        res.json({
            message: "User Account Created Successfully"
        })
    }
    else{
        res.json({
            message: "Account Already Exists"
        })
    }

})

module.exports = app