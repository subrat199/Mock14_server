const jwt = require("jsonwebtoken");
const auth = (req,res,next)=>{
    const  token  = JSON.parse(localStorage.getItem("token"))
   
    if(token){
        try {
            const decoded= jwt.verify(token.split(" ")[1], "masai"); 
            // console.log(decoded)
            const userId=decoded.userId
            req.body.userId = userId
            if(decoded){
                next();
            }else{
                res.send({"msg":"Plase login"})
            }
        } catch (error) {
            res.send({"error":error.message});
        }
       
    }else{
        res.send({"msg":"YOu dont have a token"})
    }
}
module.exports={
    auth
}