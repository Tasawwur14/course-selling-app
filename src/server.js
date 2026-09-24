const dotenv = require("dotenv")
const connectDB = require("./config/db")
const adminRouter = require("./routes/admin.routes");
const express = require("express")
const app = express();


dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);

connectDB();

app.use(express.json());



app.use("/admin", adminRouter);

app.get("/courses", (req, res) =>{

})

app.listen(3000,()=>{
    console.log("server running on port 3000")
})
