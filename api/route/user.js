const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const chekAuth = require("../middilware/chek-auth");


router.post("/signup",(req,res,next)=>{
    
  bcrypt.hash(req.body.password,20,(err,hash)=>{
        if(err){
           
            return res.status(500).json({
                error:err
            })
        }
        else{
            console.log(hash)
            const user = new User({
                _id:req.body._id,
                username:req.body.username,
                password:hash,
                email:req.body.email,
                phone:req.body.phone
            })

            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })

})

router.post("/login",(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                message:"user not found"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    message:"password matching failed"
                })
            }
            if(result){
                const token = jwt.sign({
                    username:user[0].username,
                    email:user[0].email,
                    phone:user[0].phone 
                },
                'this is rajnish',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    username:user[0].username,
                    email:user[0].email,
                    phone:user[0].phone,
                    token:token

                })
 
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.get("/",chekAuth,(req,res,next)=>{
    User.find()
    .exec()
    .then(result=>{
        res.status(200).json({
            all_user:result
        })
    })
})




module.exports = router;