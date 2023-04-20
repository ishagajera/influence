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



// img storage confing
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        // console.log("inside filename")
        // console.log(file)
        //const ext = file.mimetype.split("/")[1];
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});
// img filter
const isImage = (req,file,callback)=>{
    //if(file.mimetype.startsWith("image")){
        callback(null,true)
    // }else{
    //     callback(null,Error("only image is allowd"))
    // }
};
const upload = multer({
    storage:imgconfig,
    fileFilter:isImage,
});




app.post('/signup', (req, res) => {     
        const sql = "SELECT * FROM login WHERE username = ?";
        const sql_email = "SELECT * FROM login WHERE email = ?";
        const sql_insert = "INSERT INTO login (username,email,password) VALUES (?)";
        const values = [        
            req.body.name,        
            req.body.email,        
            req.body.password,    
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

app.post('/form', upload.single("files"), (req, res) => {
    // console.log(__dirname)   
    const sql_insert = "INSERT INTO posts (productname,productdesc,category,img) VALUES (?)";
    
    const values = [        
        req.body.productname,        
        req.body.productdesc,        
        req.body.category,   
        req.body.image, 
    ];
    // console.log(values)
    console.log("printing req")
    console.log(req)   
        db.query(sql_insert, [values], (err, data) => {
        if(err) {
            return res.json("Error");        
        } 
        return res.json("Success");    
        })
    })  

app.listen(port, ()=> {    
    console.log("listening");
})

module.exports = app;