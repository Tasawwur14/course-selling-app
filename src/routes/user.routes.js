const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/user");
const userMiddleware = require("../middleware/user.middleware");
const Course = require("../models/course");
const app = express();


app.use(express.json())

app.post("/signup", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const findUser = await User.findOne({
        username: username
    })

    const hashedPassword = await bcrypt.hash(password, 10)

    const token = jwt.sign({
        username,
    }, JWT_SECRET ,{ expiresIn: '1h'})

    if (!findUser) {
        await User.create({
            username: username,
            password: hashedPassword
        })
        res.json({
            message: `User Account Created Successfully, Your JWT Expires In 1hr`  ,
            token : token

        })
    }
    else {
        res.json({
            message: "Account Already Exists"
        })
    }
})

app.post("/login", async (req, res) => {
    const username = req.headers.username
    const password = req.headers.password

    const userExisits = await User.findOne({
        username: username
    })

    if (!userExisits) {
       return res.json({
            message: "User Does not exisits"
        });
    }

    const isMatch = await bcrypt.compare(password,userExisits.password)
    
    const token = jwt.sign({
        username : username 
    }, JWT_SECRET)

    if(isMatch){
        res.json({
            token : token
        })
    }
    else{
        res.json({
            message: "Invalid credentials"
        })
    }

}
)

app.get("/courses", async (req, res) => {

    const allCourses = await Course.find({
        isPublished: true
    })

    res.json({
        allCourses: allCourses
    })


})

app.post("/courses/:courseId", userMiddleware, async (req, res,) => {

    const courseId = req.params.courseId
    const username = req.username
    const findUser = await User.findOne({
        username: username

    })
    if (!findUser) {
        res.json({
            message: "User does not exists"
        })
    }
    else {
        findUser.purchasedCourses.push(courseId);
        await findUser.save()
        res.json({
            message: "purchase complete"
        })
    }

})
app.get("/courses/purchased", userMiddleware, async (req, res) => {
    const username = req.username
    const findUser = await User.findOne({
        username: username,
    }).populate("purchasedCourses")

    res.json({
        purchasedCourses: findUser.purchasedCourses
    });

})




module.exports = app