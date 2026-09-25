const User = require("../models/user")

async function userMiddleware(req, res, next){
    const username = req.headers.username
    const password = req.headers.password
    const findUser = await User.findOne({
        username,
        password,
    })
    if(findUser){
        next()
    }
    else{
        res.json({
            message: "User does not exists"
        })
        
    }
}
module.exports = userMiddleware;