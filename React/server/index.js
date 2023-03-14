const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0011223344",
    database: "extest",
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.get("/", (req, res) => {
//     const sqlInsert = "INSERT INTO users (username, num_posts, num_followers, cat_1, cat_2, cat_3) VALUES ('johnny', 1, 10000000, 'pillows', 'glasses', 'stickers');"
//     db.query(sqlInsert, (err, result) => {
//         res.send(err);
//     });
// });

app.get("/query", (req, res) => {
    const usr = req.body.username;
    console.log(usr);
    db.query("SELECT cat_1, cat_2, cat_3 FROM users WHERE username LIKE ?", [`%${usr}%`], (err, result) => {
        res.send(result)
    })
});

app.post("/searchUser", (req, res) => {
    const username = req.body.username;

    db.query("SELECT predicted_class_1, predicted_class_2, predicted_class_3, predicted_score_1, predicted_score_2, predicted_score_3 FROM users WHERE username = ?", 
            [username], 
            (err, result) => {
                if(err) { 
                    res.send({err: err});
                }
                if(result.length > 0) {
                    res.send(result);
                }
                else {
                    res.send({message: "No user exists"});
                }
            });
});

app.post("/getProbs", (req, res) => {
    const username = req.body.username;

    db.query("SELECT predicted_score_1, predicted_score_2, predicted_score_3 FROM users WHERE username = ?",
    [username],
    (err, result) => {
        if(err) { 
            res.send({err: err});
        }
        if(result.length > 0) {
            res.send(result);
        }
        else {
            res.send({message: "No user exists"});
        }
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});