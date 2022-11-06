const validUser=async(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    const role=req.body.role;
    if(password&&email&&role){
       await next();
    }else{
        res.send("Please fill all fields")
    }
}

module.exports = {validUser}