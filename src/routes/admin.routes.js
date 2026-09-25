const express = require("express");
const Admin = require("../models/admin");
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

app.get("/courses", (req, res) => {
    res.json({
        message: "courses route working"
    })
})

module.exports = app;