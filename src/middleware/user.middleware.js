// const User = require("../models/user")

// async function userMiddleware(req, res, next){
//     const username = req.headers.username
//     const password = req.headers.password
//     const findUser = await User.findOne({
//         username,
//         password,
//     })
//     if(findUser){
//         next()
//     }
//     else{
//         res.json({
//             message: "User does not exists"
//         })

//     }
// }
// module.exports = userMiddleware;

const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

function userMiddleware(req, res, next) {
    const token = req.headers.authorization

    if (!token || !token.startsWith("Bearer")) {
        return res.status(401).json({
            message: "Authorization token missing or invalid format"
        })
    }

    const words = token.split(" ")
    const jwtToken = words[1];

    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET)

        if (decodedValue.username) {
            req.username = decodedValue.username;
            next()
        } else {
            res.json({
                message: "Your are not authenticated"
            });
        }   
        }catch (erro) {
            res.status(403).json({
                message: "Invalid or expired token"
            });

        }
    }

module.exports = userMiddleware;