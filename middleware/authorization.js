const jwt=require('jsonwebtoken');
const { UserModel } = require('../Model/User.model');

// Authorization
const authorization=async(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1];
    if(!token) {
        res.send("Please Login");
    }else{
        const decode=jwt.verify(token,process.env.KEY);
        console.log(decode);
        if(decode){
            const user=await UserModel.findOne({_id: decode.userID})
            console.log(user)
            if(user.role==="Admin") next()
            else{
            res.send("Access Denied");
        }
        }else{
            res.send("Access Denied");
        }
    }
}

module.exports={authorization}