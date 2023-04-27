// require("dotenv").config();
const express = require("express");

const port = 8081;//8004;


const mysql = require('mysql');

const cors = require('cors');
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const moment = require("moment");

const path = require('path');


const app1 = express();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static("uploads"))
app.use(express.urlencoded({extended: true}))

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
        database: "signup"
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
            req.body.password,
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
    check('password', "password length 8-10").isLength({min: 8, max: 10})], 
    (req, res) => {    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";    
    db.query(sql, [req.body.email,req.body.password ], (err, data) => {
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
    const sql_insert = "INSERT INTO posts (username,productname,productdesc,category,img) VALUES (?)";
    // console.log(req)
    const values = [   
        req.body.useremail,     
        req.body.productname,        
        req.body.productdesc,        
        req.body.category,   
        req.file.filename, 
    ];
 
    db.query(sql_get_username, [req.body.useremail], (err, data) => {
        if(data.length === 0) {
            return res.json("Error");        
        } 
        // console.log("printing data after sql fetc")
        // console.log(data)
        return res.json(data);    
        })
    db.query(sql_insert, [values], (err, data) => {
        if(err) {
            return res.json("Error");        
        } 
        return res.json("Success");    
        })
    })  

    app.get("/getdata",(req,res)=>{
        try {
            db.query("SELECT * FROM posts",(err,result)=>{
              
                if(err){
                    console.log("error select")
                }else{
                    console.log("data get")
                    // console.log(result)
                    res.status(201).json({status:201,data:result})
                }
            })
        } catch (error) {
            res.status(422).json({status:422,error})
        }
    });

//display influencer profile
app.get("/getinfluencerdata",(req,res)=>{
    // const sql_get_user = "SELECT * FROM influencer_data WHERE Username = ?";
    const sql_get_user = "SELECT * FROM influencer_data c, login n WHERE c.Username = n.Username";
    const sql_get_username = "SELECT * FROM login WHERE email = ?";
 
    
    var username_fetched =""
    
    try {
        db.query(sql_get_username, [req.query.useremail], (err, data) => {
            if(data.length === 0) {
                return res.json("Error");        
            } 

           
            username_fetched = data[0].username
            var profileimg_fetched = data[0].profileimg
           

            db.query(sql_get_user,[username_fetched],(err,result)=>{
             
                if(err){
                    console.log("error select influencer")
                }else{
                  
                  
                    res.status(201).json({status:201,data:result})
                }
            })

            })
         
        
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});

app.get("/getexploredata",(req,res)=>{
    try {
        db.query("select DISTINCT * from influencer_categories c,influencer_data n WHERE c.Username=n.Username order by normalized_rating desc",(err,result)=>{
            if(err){
                console.log("error select influencer")
            }else{
                console.log("data explore get")
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