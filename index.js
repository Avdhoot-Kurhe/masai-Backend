const express = require("express");
const { connection } = require("./config/db");
const bcrypt=require("bcrypt");
require("dotenv").config();
var cors = require('cors')
const jwt = require("jsonwebtoken");
const bookRouter = require("./routes/book.routes");
const { validUser } = require("./middleware/validUser");
const { UserModel } = require("./Model/User.model");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("welcome to homepage");
  })

app.post("/signup",validUser,async(req, res) => {
    const {email,password,role}=req.body;
    bcrypt.hash(password, +(process.env.ROUNDS),async(err,result)=>{
        if(err){
            res.send("Signup Failed...,Please enter again")
        }else{
            const user=new UserModel({email:email,password:result,role:role})
            await user.save();
            res.send("Signup successfully saved")
        }
    })
    
});

app.post("/login", async(req,res)=>{   
    const {email,password}=req.body;
    
    const user=await UserModel.findOne({email:email})
    console.log(user)
    const fpassword=user.password;
    const user_id=user._id
    console.log(user_id)
    bcrypt.compare(password,fpassword,(err,result)=>{
        if(err){
            res.send("Login Failed...,Please login again")
        }else{
            const token=jwt.sign({userID:user_id},process.env.KEY)

            res.send({msg:"Login successfully",token})

        }
    })
});

app.use("/book",bookRouter)

app.listen(process.env.PORT, async () => {
    try {
      await connection;
      console.log("connected to db successfully");
    } catch (err) {
      console.log("err to connected db");
    }
    console.log("server started at http://localhost:8008");
  });