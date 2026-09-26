const express = require("express");
const bcrypt = require("bcryptjs")
const Admin = require("../models/admin");
const adminMiddleware = require("../middleware/admin.middleware");
const Course = require("../models/course");
const app = express();

app.use(express.json())

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingAdmin = await Admin.findOne({
        username: username
    })

    const hashedPassword = await bcrypt.hash(password,10)

    if (!existingAdmin) {

        await Admin.create({
            username: username,
            password: hashedPassword
        })

        res.json({
            message: "Admin created successfully"
        })
    }
    else {
        res.json({
            message: "Admin already exists"
        })
    }
})
app.post("/login", async (req, res) => {
    const username = req.body.username
    const password = req.body.password;
    
    const findAdmin = await Admin.findOne({
        username: username
        
    })
    
     if (!findAdmin) {
        return res.json({
            
            message: "User does not exists"
        });
    }

    const isMatch = await bcrypt.compare(password,findAdmin.password)

    if (isMatch) {
        res.json({
            message: "Login successfully"
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