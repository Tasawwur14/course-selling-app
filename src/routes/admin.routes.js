const express = require("express");
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

    if (!existingAdmin) {

        await Admin.create({
            username: username,
            password: password
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
        username: username,
        password: password
    })

    if(findAdmin){
        res.json({
            message:"Login successfully"
        })
    }else{
        res.json({
            message:"invalid credentials"
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
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        message: "Course Created successfully", 
        courseId : newCourse._id
    })

})




app.get("/courses", adminMiddleware, (req, res) => {
    res.json({
        message: "courses working"
    })
})

module.exports = app;