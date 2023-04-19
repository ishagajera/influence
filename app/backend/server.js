const express = require("express");

const mysql = require('mysql');

const cors = require('cors');
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const moment = require("moment");

// const storage = multer.diskStorage({
//     destination:(req,file,cb) =>{
//         cb(null,"./");
//     },
//     filename: function(req,file,cb){
//         const ext = file.mimetype.split("/")[1];
//         cb(null,'uploads/${file.originalname}-${Date.now()}.${ext}');

//     }
// });

// const upload = multer({
//     storage: storage
// });
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("./uploads"))

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
        console.log("inside filename")
        console.log(file)
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
    //fileFilter:isImage,
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

app.post('/form',upload.single("image"), (req, res) => {    
    console.log("value of upload: ") 
    console.log(upload)
    const sql_insert = "INSERT INTO posts (productname,productdesc,category,img) VALUES (?)";
    // console.log("printing req:")
    // console.log(req.body.productdesc)
    const values = [        
        req.body.productname,        
        req.body.productdesc,        
        req.body.category,   
        req.body.image, 
    ];   
        db.query(sql_insert, [values], (err, data) => {
        if(err) {
            return res.json("Error");        
        } 
        return res.json("Success");    
        })
    })  

app.listen(8081, ()=> {    
    console.log("listening");
})