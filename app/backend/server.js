// require("dotenv").config();
// import AuthService from "../frontend/src/services/auth.service.js";
const express = require("express");

const port = 8081;//8004;


const mysql = require('mysql');

const cors = require('cors');
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const moment = require("moment");

const path = require('path');

var md5 = require('md5');

const app1 = express();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static("uploads"))
app.use(express.urlencoded({extended: true}))
onbeforeunload = function () {
    console.log("Do you really want to close?")
    return "Do you really want to close?";
    
};
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
   
    next();
    });

const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "signup",
        charset: "utf8mb4",
    })

// img storage confing - for profile photo
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        
        callback(null,`profileimg-${file.originalname}`)
    }
});
// img filter
const isImage = (req,file,callback)=>{
    
        callback(null,true)
    
};
const upload = multer({
    storage:imgconfig,
    fileFilter:isImage,
});

// img config for uploading pictures of promotion posts:
const imgconfig_post = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        
        callback(null,`image-${file.originalname}`)
    }
});

const upload_post = multer({
    storage:imgconfig_post,
    fileFilter:isImage,
});



app.post('/signup', upload.single("files"), (req, res) => {     
        const sql = "SELECT * FROM login WHERE username = ?";
        const sql_email = "SELECT * FROM login WHERE email = ?";
        const sql_insert = "INSERT INTO login (username,email,password,typeofuser,profileimg) VALUES (?)";
        const values = [        
            req.body.name,        
            req.body.email,        
            md5(req.body.password),
            req.body.typeofuser,
            req.file.filename,    
        ];   
    db.query(sql,req.body.name, (err, data) => {
       
        if (data.length > 0 && req.body.name == data[0].username ) {
         
            return res.json("Username Already Registered");
        }

        db.query(sql_email,req.body.email, (err, data) => {
            if (data.length > 0 && req.body.email == data[0].email) {
         
                return res.json("Email Already In Use");
            }  
            
            db.query(sql_insert, [values], (err, data) => {
            
            if(err) {
                return res.json("Error");        
            } 
            return res.json(data);    
            })

        })  
    }) 
})
    

app.post('/login',[    
    check('email', "Email length error").isEmail().isLength({min: 10, max:30}),    
    check('password', "password length 8-10").isLength({min: 8, max: 30})], 
    (req, res) => {    const sql = "SELECT * FROM login WHERE email = ? AND password = ?"; 
     
    db.query(sql, [req.body.email,md5(req.body.password[0])], (err, data) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.json(errors);        
        } 
        else {            
            if(err) {
                    return res.json("Error");            
                }            
            if(data.length > 0) {
                return res.json("Success");            
            } 
            else {                
                return res.json("Failed");            
            }        
        }            
    })
})

app.post('/form', upload_post.single("files"), (req, res) => {
    const sql_get_username = "SELECT * FROM login WHERE email = ?";
    const sql_insert = "INSERT INTO posts (productname,productdesc,category,img,username) VALUES (?)";
    
 
    db.query(sql_get_username, [req.body.useremail], (err, data) => {
       
            if(data.length === 0) {
                return res.json("Error");        
            } 
            username_fetched = data[0].username
            const values = [    
                req.body.productname,        
                req.body.productdesc,        
                req.body.category,   
                req.file.filename, 
                username_fetched,   
            ];
            db.query(sql_insert, [values], (err, data) => {
                if(err) {
                    return res.json("Error");        
                } 
                return res.json("Success");    
                })
        })
    
    })  

app.get("/getdata",(req,res)=>{
        try {
            db.query("SELECT * FROM posts",(err,result)=>{
              
                if(err){
                    console.log("error in /getdata")
                }else{
                    res.status(201).json({status:201,data:result})
                }
            })
        } catch (error) {
            res.status(422).json({status:422,error})
        }
    });

//display influencer profile - myProfile option
app.get("/getinfluencerdata",(req, res) => {
        const sql_get_user = "SELECT * FROM influencer_data c, login n,  influencer_categories ic , ratings r WHERE c.Username = n.Username and ic.username = c.Username and r.username = ic.username and n.Username=?";
        const sql_get_username = "SELECT * FROM login WHERE email = ?";
        // const sql_catgory = "Select Category1 from influencer_categories where username =?";
        
        try {
            db.query(sql_get_username, [req.query.useremail], (err, data) => {
                if(data.length === 0) {
                    return res.json("Error");        
                } 
                username_fetched = data[0].username
                var profileimg_fetched = data[0].profileimg
                db.query(sql_get_user,[username_fetched],(err,result)=>{
                
                    if(err){
                        console.log("error display my profile")
                    }
                    else{
                        res.status(201).json({status:201,data:result})

                    }
                })

                })
            
            
        } catch (error) {
            res.status(422).json({status:422,error})
        }
    
});

//display influencer profile after clicking view profile button on explore influencers page
app.get("/showinfprofile",(req,res)=>{
    const sql_get_user = "SELECT * FROM influencer_data c, login n,  influencer_categories ic , ratings r WHERE c.Username = n.Username and ic.username = c.Username and r.username = ic.username and n.Username=?";
    var username_fetched = req.query.username;
    try {
      
            db.query(sql_get_user,[username_fetched],(err,result)=>{
             
                if(err){
                    console.log("error display profile of influencer after clicking")
                }else{
                   
                    res.status(201).json({status:201,data:result})
                }
            })        
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});



app.get("/getexploredata",(req,res)=>{
    const get_profile_img = "select DISTINCT * from influencer_categories c,influencer_data n,login log WHERE c.Username=n.Username and n.Username = log.username order by normalized_rating desc";
    //"select DISTINCT * from influencer_categories c,influencer_data n WHERE c.Username=n.Username order by normalized_rating desc"
    try {
        db.query(get_profile_img,(err,result)=>{
            if(err){
                console.log("error select influencer")
            }else{
                res.status(201).json({status:201,data:result})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});

//display brand profile page
app.get("/getbranddata",(req,res)=>{
    try {
        db.query("SELECT * FROM Brands",(err,result)=>{
            if(err){
                console.log("error select influencer")
            }else{
                res.status(201).json({status:201,data:result})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});
// store username and type of user in session storage
app.get("/getinfo",(req,res)=>{
    try {
        db.query("SELECT * FROM login WHERE email =?",[req.query.useremail],(err,result)=>{
          
            if(err){
                console.log("error in get info for storing info in session")
            }else{
                
                res.status(201).json({status:201,data:result})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});


app.listen(port, ()=> {    
    console.log("listening");
})

module.exports = app;