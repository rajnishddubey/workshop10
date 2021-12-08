const express=require('express');
const app=express();
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const cors = require("cors");

//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());
//app.use(cors());

const userRoute = require("./api/route/user")
//connect to db
mongoose.connect("");

mongoose.connection.on('error',err=>{
    console.log("connection intruppted with database")
});

mongoose.connection.on('connected',connected=>{
    console.log("connected with database")
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


app.use("/user",userRoute);


app.listen(3000,()=>{
    console.log("server is running at port 3000");
});
