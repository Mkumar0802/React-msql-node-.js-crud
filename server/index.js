const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// parse application/json
app.use(bodyParser.json());

//Create Database Connection
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"muthu@123",
    database: "mydb"
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});

// creat a new Record
app.post("/create", (req, res) => {
	let data = { name: req.body.name, age: req.body.age,country: req.body.country, position: req.body.position, salary: req.body.salary };
	let sql = "INSERT INTO employee SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

// show all records
app.get("/employee", (req, res) => {
	let sql = "SELECT * FROM employee";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// show a single record
app.get("/employee/:id", (req, res) => {
	let sql = "SELECT * FROM employee WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// delete the record
app.delete("/delete/:id", (req, res) => {
	let sql = "DELETE FROM employee WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});

// update the Record
app.put("/update/", (req, res) => {
	let sql = "UPDATE employee SET name='" + req.body.name + "',age='" + req.body.age + "',country='" + req.body.country + "',position='" + req.body.position + "', salary='" + req.body.salary + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});

app.listen(3001, () => {
	console.log("server started on port 3001...");
});