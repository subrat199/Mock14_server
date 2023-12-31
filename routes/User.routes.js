const express=require('express')
const userRouter = express.Router()
const {userModel}=require("../model/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
userRouter.post("/signup",async (req,res)=>{
    try {
        const { email, password } = req.body;
    
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = new userModel({ email, password: hashedPassword });
        await newUser.save();
    
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
})
userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try {
        const user= await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
               if(result){
                const token = jwt.sign({userId:user._id }, 'masai')
                console.log(token)
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