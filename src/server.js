const dotenv = require("dotenv")
const connectDB = require("./config/db")
const adminRouter = require("./routes/admin.routes");
const userRouter = require("./routes/user.routes")
const express = require("express")
const app = express();


dotenv.config();
connectDB();

app.use(express.json());



app.use("/admin", adminRouter);
app.use("/user", userRouter);


app.get("/courses", (req, res) =>{

})

app.listen(3000,()=>{
    console.log("server running on port 3000")
})
