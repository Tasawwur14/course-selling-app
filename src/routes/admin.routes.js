const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const Admin = require("../models/admin");
const adminMiddleware = require("../middleware/admin.middleware");
const Course = require("../models/course");
const { JsonWebTokenError } = require("jsonwebtoken");
const userMiddleware = require("../middleware/user.middleware");

const app = express();

app.use(express.json())

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingAdmin = await Admin.findOne({
        username: username
    })

    const hashedPassword = await bcrypt.hash(password,10)

    const token = jwt.sign({
        username,
    },JWT_SECRET, {expiresIn:'1h'})

    if (!existingAdmin) {

        await Admin.create({
            username: username,
            password: hashedPassword
        })

        res.json({
            message: "Admin created successfully, Your JWT will expire in 1hr",
            token : token 
        })
    }
    else {
        res.json({
            message: "Admin already exists"
        })
    }
})
app.post("/login",  async (req, res) => {
    const username = req.headers.username
    const password = req.headers.password;
    
    const findAdmin = await Admin.findOne({
        username: username
        
    })
    
     if (!findAdmin) {
        return res.json({
            
            message: "User does not exists"
        });
    }

    const isMatch = await bcrypt.compare(password,findAdmin.password)

    const token = jwt.sign({
        username
    }, JWT_SECRET)

    if (isMatch) {
       res.json({
        message: "login successfully",
        token : token
       })
    } 
    else{
        res.json({
            message:"Invalid Creadentials"
        })
    }

})

app.put("/updateAdmin", async (req, res) => {
    const findAdmin = await Admin.findOne({
        username: username
    })


})
app.post("/courses", adminMiddleware, async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const imageLink = req.body.imageLink
    const price = req.body.price
    const isPublished = req.body.isPublished

    const findCourse = await Course.findOne({
        title,
        description,
        imageLink,
        price,
        isPublished,
    })

    if (!findCourse) {
        const newCourse = await Course.create({
            title,
            description,
            imageLink,
            price,
            isPublished
        })
        res.json({
            message: "Course Created successfully",
            courseId: newCourse._id
        })
    }
    else{
        res.json({
            message:"Course Already Exists"
        })
    }

})




app.get("/courses", adminMiddleware, async (req, res) => {
    const allCourses = await Course.find()
    res.json({
        allCourses: allCourses
    })

})

module.exports = app;