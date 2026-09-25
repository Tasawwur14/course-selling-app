const express = require("express")
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
    if (!findUser) {
        await User.create({
            username: username,
            password: password
        })
        res.json({
            message: "User Account Created Successfully"
        })
    }
    else {
        res.json({
            message: "Account Already Exists"
        })
    }
})

app.post("/login", async (req, res) => {
        const username = req.body.username
        const password = req.body.password

        const userExisits = await User.findOne({
            username: username,
            password: password
        })

        if (!userExisits) {
            res.json({
                message: "Invalid credentials"
            })
        }
        else {
            res.json({
                message: "Login Successfully"
            })
        }

    })

app.get("/courses", async (req, res)=>{
    
    const allCourses = await Course.find({
        isPublished : true
    })
    
    res.json({
        allCourses:allCourses
    })


})

app.post("/courses/:courseId",userMiddleware, async (req, res,) =>{

    const courseId = req.params.courseId
    const username = req.headers.username
    const findUser = await User.findOne({
        username: username

    })
    if(!findUser){
        res.json({
            message:"User does not exists"
        })
    }
    else{
        findUser.purchasedCourses.push(courseId);
        await findUser.save()
         res.json({
            message:"purchase complete"
         })
    }

})
app.get("/courses/purchased",userMiddleware, async (req, res)=>{
    const username = req.headers.username
    const findUser = await User.findOne({
        username : username , 
    }).populate("purchasedCourses")

   res.json({
        purchasedCourses: findUser.purchasedCourses
    });

})




module.exports = app