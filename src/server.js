const dotenv = require("dotenv")
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET
const connectDB = require("./config/db")
connectDB();
const adminRouter = require("./routes/admin.routes");
const userRouter = require("./routes/user.routes")
const express = require("express")
const app = express();





app.use(express.json());



app.use("/admin", adminRouter);
app.use("/users", userRouter);



app.listen(3000,()=>{
    console.log("server running on port 3000")
})
