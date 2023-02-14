const auth = require("../model/auth")
const bcryptjs = require("bcryptjs")
const jwtToken = require("jsonwebtoken")


const register  = async(req,res)=>{
    try{
        const {userName, email, password} =  req.body
        const user = await auth.findOne({email})

        console.log(userName)
        if(user){
            return res.status(401).json({"message":"User already was saved"})
        }

        if(password.length < 6 ){
            return res.status(401).json({"message":"Password must not be lower than 6"})
        }

        const passwordHash = await bcryptjs.hash(password,12)
        const newUser = await auth.create({userName, email, password: passwordHash})

        const userToken = jwtToken.sign({id:newUser.id},process.env.SECRET_TOKEN,{expiresIn:"1h"})

        return res.status(201).json({status:"OK",newUser,userToken})

    }catch(err){
        return res.status(500).json({"message":err.message})
    }
}

const login  = async(req,res)=>{
    try{
        const {email, password} =  req.body
        const user = await auth.findOne({email})

        if(!user){
            return res.status(401).json({"message":"Any user not found"})
        }
        const comparedPass = await bcryptjs.compare(password,user.password)
        if(!comparedPass)
        {
            return res.status(401).json({"message":"Passwords is wrong"})
        }

        const userToken = jwtToken.sign({id:user.id},process.env.SECRET_TOKEN,{expiresIn:"1h"})

        return res.status(201).json({status:"OK",user,userToken})

    }catch(err){
        return res.status(500).json({"message": err.message})
    }
}


module.exports = {register,login}