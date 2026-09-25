const Admin = require("../models/admin")

async function adminMiddleware (req, res, next){
    const username = req.headers.username
    const password = req.headers.password
    const findAdmin = await Admin.findOne({
        username,
        password
    })
    if(findAdmin){
         next()
    }
    else{
       res.status(403).json({
            message: "Admin Does not exists"
        })
    }

}
module.exports = adminMiddleware