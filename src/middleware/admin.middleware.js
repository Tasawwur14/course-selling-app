// const Admin = require("../models/admin")

// async function adminMiddleware (req, res, next){
//     const username = req.headers.username
//     const password = req.headers.password
//     const findAdmin = await Admin.findOne({
//         username,
//         password
//     })
//     if(findAdmin){
//          next()
//     }
//     else{
//        res.status(403).json({
//             message: "Admin Does not exists"
//         })
//     }

// }
// module.exports = adminMiddleware
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require("jsonwebtoken")


function adminMiddleware(req, res, next) {
    const token = req.headers.authorization

    if (!token || !token.startsWith("Bearer")) {
        return res.json({
            message: "You are not authenticated or invalid format "
        })
    }


    const words = token.split(" ");
    const jwtToken = words[1]

    
    try {

        const decodedValue = jwt.verify(jwtToken, JWT_SECRET)
        if (decodedValue.username) {
            req.username = decodedValue.username
            next()
        } else {
            res.json({
                message: "You are not authenticated"
            })
        }
    } catch (err) {
        res.json({
            message : "Invalid or expired token"
        })
    }


}

module.exports = adminMiddleware;