var express = require('express')
var app = express()
var mysql = require('mysql')
const bodyParser = require('body-parser');
var logger = require('morgan');
const cors = require('cors');


app.use(cors());
app.use(express.json());

const port =  3001;

app.use(bodyParser.json())
app.use(logger('dev'));


// creating db connection
// var db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"muthu@123",
//     database: "mydb"
// })

// db.connect(function(err){
//     if(err) throw(err)
//     console.log("mysql db  connected")
// })


// //create data
// app.post('/create', (req, res) => {
//     const name = req.body.name;
//     const age = req.body.age;
//     const country = req.body.country;
//     const position = req.body.position;
//     const salary = req.body.salary;

//     db.query(
//         'INSERT INTO employee (name, age,country,position,salary) VALUES (?,?,?,?,?)',
//         [name, age,country,position,salary],
//         (err, rows,fields) => {
//             if (!err) {

//                 res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }))
                
//             }
//             else {
//                 console.log(err);
//             }
//         }
//     );
// });

// // update data
// app.put('/update', (req, res) => {

//     const id = req.body.id
//     const name = req.body.name;
//     const age = req.body.age;
//     const country = req.body.country;
//     const position = req.body.position;
//     const salary = req.body.salary;
   

//     db.query(
//         'UPDATE employee SET name = ?, age = ?,country = ?, position = ? , salary = ?  WHERE id = ?', [name,age,country,position,salary,id],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
//             }
//         })
// });

// // Get data
// app.get('/employ', (req, res) => {

//     db.query('SELECT * FROM employee',
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 res.send(JSON.stringify({ status: 200, error: null, response: result }));
//             }
//         })
// }
// );


// //Get data using params
// app.get('/employ/:id', (req, res) => {

//     db.query('SELECT * FROM employee WHERE id = ?',[req.params.id],
//         (err, result) => {
//             if (!err) {
//                 res.send(rows);
//             }
//             else {
//                 res.send(JSON.stringify({ status: 200, error: null, response: result }));
//             }
//         })
// }
// )

// //delete data using params
// app.delete("/delete/:id", (req, res) => {
//     const id = req.params.id;
//     db.query("DELETE FROM employee WHERE id = ?", id, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
//         }
//     });
// });




// app.listen(port, () => console.log(`Listening on port ${port}..`));




// Create Database Connection
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
	let data = { name: req.body.name, age: req.body.age, country: req.body.country, email: req.body.email, mobile: req.body.mobile };
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
	let sql = "UPDATE employee SET name='" + req.body.name + "',age='" + req.body.age + "',country='" + req.body.country + "',email='" + req.body.email + "', mobile='" + req.body.mobile + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});

app.listen(3001, () => {
	console.log("server started on port 3001...");
});



// var sql = "INSERT INTO employee (name, age, country, position, salary) values ('hentry','25','indai','sff','dfas')";
// db.query(sql,function(err,result){
//     if(err)
//     throw(err);
//     console.log("values add")
// })



// app.post('/create', (req, res) => {
//     let emp = req.body;
//     var sql =  'INSERT INTO employee (name, age, country) VALUES (?,?,?)';
  
//     db.query(sql, [emp.name, emp.age, emp.country], (err, rows, fields) => {
//         if (!err)
//                 //  console.log("emp.age");
//                 res.send('Inserted employee id');
           
//         else
//             console.log(err);
//     })
// });




// app.post('/create', (req, res) => {
//     // const name = req.body.name;
//     // const age = req.body.age;
//     // const country = req.body.country;
 
//     var emp = req.body 

//     var sql = "SET @name =?,SET @age =?; \
//     CALL EmployeeAddorEdit(@name,@age);"
//     db.query(sql,[emp.name,emp.age],(err,rows,fields) =>{
//         if(!err)
//         res.send (rows);
//         else
//         console.log(err)
//     })
//         }
//     );



// app.put("/update:id", (req, res) => {
//     const id = req.params.id;
//     var sql = "update employee WHERE id = ? id,(name,age,country,position,salary )"
   
//     db.query(sql, [emp.name, emp.age, emp.country, emp.position,emp.salary], (err, rows, fields) => {
//         if (!err)
//             res.send('Updated successfully');
//         else
//             console.log(err);
//     })
// });


// app.put('/update', (req, res) => {

//     const id = req.body.id
//     const name = req.body.name
//     const age = req.body.age
//     const country = req.body.country
//     const poistion = req.body.poistion
//     const salary = req.body.salary


//     db.query('UPDATE employee SET name = ?  age = ? country = ? poistion = ? salary = ?  WHERE id = ?', [name,age,country,poistion,salary, id],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 res.send(result);
//                 console.log(result)
//             }
//         })
// });



// app.post('/create', (req, res) => {
    //     const name = req.body.name;
    //     const age = req.body.age;
    //     // const country = req.body.country;
    //     // const position = req.body.position;
    //     // const salary = req.body.salary;
    
    //     db.query(
    //         'INSERT INTO employee (name, age) VALUES (?,?)',
    //         [name, age],
    //         (err, rows,fields) => {
    //             if (!err) {
    
    //                 res.send(rows);
                    
    //             }
    //             else {
    //                 console.log(err);
    //             }
    //         }
    //     );
    // });
    
    
    
    
    
    // app.put('/update', (req, res) => {
        
    //     const id = req.body.id
    //     const name = req.body.name
    //     const age = req.body.age
    //     db.query("UPDATE StudentInfo SET [Name] = '" + req.body.name + "', Age = " + req.body.age + " WHERE ID = " + req.body.id),
        
    //         (err, result) => {
    //             if (!err) {
    //                 res.send(result);
                    
    //             }
    //             else {
    //                 console.log(err);
    //             }
    //         }
    // });
    
    // /* Update Student */
    // app.put('/updateStudent', function (req, res) {
    //     sql.connect(dbConfig.dbConnection()).then(() => {
    //         return sql.query("UPDATE StudentInfo SET [Name] = '" + req.body.Name + "', Age = " + req.body.Age + " WHERE ID = " + req.body.ID);
    //     }).then(result => {
    //         res.status(200).send("Student Updated Successfully.");
    //     }).catch(err => {
    //         res.status(500).send("Something Went Wrong !!!");
    //     })
    // });
    
    
    // // app.put("/update", (req, res) => {
    // //     const emp = req.body;
    // //     var sql = "SET @id; SET @name = ?; SET @age = ?; \
    // //     CALL EmployeeAddOrEdit(@id,@name,@age);";
       
    // //     db.query(sql, [emp.id,emp.name, emp.age,], (err, rows, fields) => {
    // //         if (!err)
    // //             res.send('Updated successfully');
    // //         else
    // //             console.log(err);
    // //     })
    // // });
    
    // app.get('/employ', (req, res) => {
    
    //     db.query('SELECT * FROM employee',
    //         (err, result) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             else {
    //                 res.send(result);
    //             }
    //         })
    // }
    // )
    
    // app.get('/employ/:id', (req, res) => {
    
    //     db.query('SELECT * FROM employee WHERE id = ?',[req.params.id],
    //         (err, rows,fields) => {
    //             if (!err) {
    //                 res.send("deleted");
    //             }
    //             else {
    //                 console.log(row);
    //             }
    //         })
    // }
    // )
    
    
    
    
    
    
    // app.delete("/delete/:id", (req, res) => {
    //     const id = req.params.id;
    //     db.query("DELETE FROM employee WHERE id = ?", id, (err, result) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.send(result);
    //         }
    //     });
    // });