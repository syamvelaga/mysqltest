const express = require("express")
const mysql = require("mysql2")

const app = express()

const db = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "$995949KKk",
    database: process.env.DB_DATABASE || "mytestdb"
});
app.get("/home", (req, res) => {
    let query = `SELECT * from test`;
    db.query(query, (err, data) => {
        if (err) {
            console.error(err); // Log the error to the console
            return res.json("Error");
        }
        console.log(data); // Log the data to the console
        return res.json(data);
    });
});

app.listen(3001,()=>{
    console.log("Server is Running")
})