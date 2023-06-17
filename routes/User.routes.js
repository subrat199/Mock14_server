const express=require('express')
const userRouter = express.Router()
const {userModel}=require("../model/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
userRouter.post("/signup",async (req,res)=>{
    const {email,password}=req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) =>{
            // Store hash in your password DB.
            const user=new userModel({email,password:hash})
        await user.save()
        res.status(200).send("New user has been registered")
        
        });
        
    } catch (error) {
        console.log(error)
        res.status(404).send("There is something wrong with your registration")
    }
   
})
userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try {
        const user= await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
               if(result){
                console.log(user)
                const token = jwt.sign({userId:user._id }, 'masai')

                res.status(200).send({"mesg":"Login SuccessFull","token":token})
               }else{
                res.status(200).send("Wrong Credentials")
               }
            });
        }else {
            res.status(200).send("Login Failure")
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({"message":error.message})
    }
})
module.exports={
    userRouter
}