const express = require("express")
const mysql = require("mysql2")

const app = express()

app.use(express.json());


const db = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DB_HOST || "bsbg9a19x80mvtn8mwuu-mysql.services.clever-cloud.com",
    user: process.env.DB_USER || "ut6qcv3o43lbmxle",
    password: process.env.DB_PASSWORD || "Rh7HrBMfd4MlJ64SKr5k",
    database: process.env.DB_DATABASE || "bsbg9a19x80mvtn8mwuu"
});
app.get("/home", (req, res) => {
    let query = `SELECT * from mytestdb`;
    db.query(query, (err, data) => {
        if (err) {
            console.error(err); // Log the error to the console
            return res.json("Error");
        }
        console.log(data); // Log the data to the console
        return res.json(data);
    });
});

app.post("/insert", (req, res) => {
    // Assuming the request body contains the data to be inserted
    const { user_name, age, address } = req.body;

    // Ensure that all required fields are provided
    if (!user_name || !age || !address) {
        return res.status(400).json({ error: "Please provide all required fields: user_name, age, address" });
    }

    // Construct the SQL query
    let query = `INSERT INTO test (user_name, age, address) VALUES (?, ?, ?)`;
    let values = [user_name, age, address];

    // Execute the query
    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err); // Log the error to the console
            return res.status(500).json({ error: "Error inserting data" });
        }
        console.log("Data inserted successfully");
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});


app.listen(3001,()=>{
    console.log("Server is Running")
})