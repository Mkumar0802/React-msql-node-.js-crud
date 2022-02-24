import React from "react";
import { Container, Row, Form, FormGroup, FormControl, FormLabel, Button, Table } from "react-bootstrap";
import "./index.css";
import"./App.css";
import Swal from 'sweetalert2';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      country: "",
      email: "",
      mobile: "",
      records: [],
      showAlert: false,
      alertMsg: "",
      alertType: "success",
      id: "",
      update: false,
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  componentWillMount() {
    this.fetchAllRecords();
  }

  // add a record
  addRecord = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var body = JSON.stringify({ name: this.state.name, age: this.state.age, country: this.state.country, email: this.state.email, mobile: this.state.mobile });
    fetch("http://localhost:3001/create", {
      method: "POST",
      headers: myHeaders,
      body: body,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({

          name: "",
          age: "",
          country: "",
          email: "",
          mobile: "",
        });

          // showAlert: true,
          // alertMsg: result.response,
          // alertType: "success",
          Swal.fire({
            icon: 'success',
            title: 'Added!!!',
            text: ' Data has been Added.',
            showConfirmButton: false,
            timer: 1500
          })

        
      });
  };

  // fetch All Records
  fetchAllRecords = () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:3001/employee", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        this.setState({
          records: result.response,
        });
      })
      .catch((error) => console.log("error", error));
  };

  // view single data to edit
  editRecord = (id) => {
    fetch("http://localhost:3001/employee/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          id: id,
          update: true,
          name: result.response[0].name,
          age: result.response[0].age,
          country: result.response[0].country,
          email: result.response[0].email,
          mobile: result.response[0].mobile


        });
      })
      .catch((error) => console.log("error", error));
  };

  // update record
  updateRecord = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var body = JSON.stringify({ id: this.state.id, name: this.state.name, age: this.state.age, country: this.state.country, email: this.state.email, mobile: this.state.mobile });
    fetch("http://localhost:3001/update/", {
      method: "PUT",
      headers: myHeaders,
      body: body,
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          
          update: false,
          id: "",
          name: "",
          age: "",
          country: "",
          email: "",
          mobile: "",
        });
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: ' Data has been updated.',
            showConfirmButton: false,
            timer: 1500
          });

        
        this.fetchAllRecords();
      })
      .catch((error) => console.log("error", error));
  };

  // delete a record
  deleteRecord = (id) => {
    fetch("http://localhost:3001/delete/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {

        // this.setState({
        //   showAlert: true,
        //   alertMsg: result.response,
        //   alertType: "danger",
        // });

        
          Swal.fire({
            icon: 'error',
            title: 'Deleted!!!!.',
            text: 'Deleted Succesfully.'
        })

        this.fetchAllRecords();
      })
      .catch((error) => console.log("error", error));
  };
  render() {
    return (
      <div>
        <Container className="bg-purple-300 pt-8">
          {/* {this.state.showAlert === true ? (
            <Alert
              variant={this.state.alertType}
              onClose={() => {
                this.setState({
                  showAlert: false,
                });
              }}
              dismissible
            >
              <Alert.Heading>{this.state.alertMsg}</Alert.Heading>
            </Alert>
          ) : null} */}
<header className="bg-purple-400 pt-2">

<h1 class="font-sans ... text-center py-5" > CRUD TASK </h1>
</header>

          {/* All Records */}
          <Row >
            <Table class="table-auto">
              <thead>
                <tr  class="border-collapse border border-slate-500 " >
                  <th class="border-3 border-slate-700 ... " >id</th>
                  <th class="border-3 border-slate-700 ...">Name</th>
                  <th class="border-3 border-slate-700 ...">Age</th>
                  <th class="border-3 border-slate-700 ...">Country</th>
                  <th class="border-3 border-slate-700 ...">Email</th>
                  <th class="border-3 border-slate-700 ...">Mobile</th>
                  <th class="border-3 border-slate-700 ... self-center ..." colSpan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.records.map((record) => {
                  return (
                    <tr >
                      <td class="border-3 border-slate-700 " >{record.id}</td>
                      <td class="border-3 border-slate-700 ...">{record.name}</td>
                      <td class="border-3 border-slate-700 ...">{record.age}</td>
                      <td class="border-3 border-slate-700 ...">{record.country}</td>
                      <td class="border-3 border-slate-700 ...">{record.email}</td>
                      <td class="border-3 border-slate-700 ...">{record.mobile}</td>
                      <td class="border-3 border-slate-700 ... ">
                        <Button  className="Edit-button"   variant="info" onClick={() => this.editRecord(record.id)}>
                          Edit
                        </Button>
                      </td>
                      <td class="border-2 border-slate-700 ... flex justify-center ..." >
                        <Button  variant="danger" onClick={() => this.deleteRecord(record.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>

          {/* Insert Form */}
          <Row className="col-xs-2"  >
            <Form className="form-inline" >
              {/* <FormGroup>
								<FormLabel>Enter the id</FormLabel>
								<FormControl type="id" name="id" placeholder="Enter the id" onChange={this.handleChange} value={this.state.id}></FormControl>
							</FormGroup> */}

              <FormGroup class="pt-8 ..." >
                <FormLabel className="px-2" >Name</FormLabel>
                <FormControl type="text" name="name"  placeholder="Enter The Name" onChange={this.handleChange} value={this.state.name}></FormControl>
              </FormGroup>
              <FormGroup className="pt-6">
                <FormLabel className="px-2">Age</FormLabel>
                <FormControl type="number" name="age" value={this.state.age} onChange={this.handleChange} placeholder="Enter The Age"></FormControl>
              </FormGroup>
              <FormGroup className="pt-6">
                <FormLabel className="px-2">Country</FormLabel>
                <FormControl type="text" name="country" value={this.state.country} onChange={this.handleChange} placeholder="Enter The Country"></FormControl>
              </FormGroup>
              <FormGroup className="pt-6">
                <FormLabel className="px-2">Email</FormLabel>
                <FormControl type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter The Email" ></FormControl>
              </FormGroup>

              <FormGroup className="pt-6 " >
                <FormLabel className="px-2" >Mobile number</FormLabel>
                <FormControl type="text" name="mobile" value={this.state.mobile} onChange={this.handleChange} placeholder="Enter The Mobile number"></FormControl>
              </FormGroup>
              <div className="button">
                {this.state.update === true ? <Button class=" transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..." onClick={this.updateRecord}>UPDATE</Button> : <Button className=" transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..." onClick={this.addRecord}>SAVE</Button>}
              </div>
            </Form>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;