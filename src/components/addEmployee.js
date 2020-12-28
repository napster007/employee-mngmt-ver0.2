 import React, { Component }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';

import app from '../firebase'; 


class AddEmployee extends Component {
  constructor() {
    super();
    this.state = {
      fname: '',
      mname:'',
      lname: '',
      bday:'',
      email:'',
      cpnum:'',
      address:'',
      password:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = app.database().ref('users');
    const item = {
      fname: this.state.fname,
      mname: this.state.mname,
      lname: this.state.lname,
      bday: this.state.bday,
      email: this.state.email,
      cpnum:this.state.cpnum,
      address:this.state.address,
      password:this.state.password
      
    }
    app.auth().createUserWithEmailAndPassword(item.email,item.password).then(cred => {
      console.log(cred.uid);

    });
    itemsRef.push(item);
    this.setState({
      fname: '',
      mname:'',
      lname: '',
      bday: '',
      email: '',
      cpnum:'',
      address:'',
      password:''
    });
  }
  render() {
    return (
      <div className='add-form-wrapper'>
        
        <Card>
        <header>
            <div className='wrapper'>
              <h1>Add Employee</h1>
              
            </div>
        </header>
          <CardContent>
              <form onSubmit={this.handleSubmit} autoComplete="off">
              <Input className="inputDatas" required id="standard-required" placeholder="First Name" label="First Name"  name="fname" onChange={this.handleChange} value={this.state.fname} />
              <Input className="inputDatas" required id="standard-basic" placeholder="Middle Name" name="mname" onChange={this.handleChange} value={this.state.mname} />
              <Input className="inputDatas" required id="standard-required" placeholder="Last Name" name="lname" onChange={this.handleChange} value={this.state.lname} />
              <Divider/>
              <TextField
              id="date"
              label="Birthday"
              type="date"
              name="bday"
              defaultValue="2017-05-24"
              
              InputLabelProps={{
                shrink: true,
              }}

              onChange={this.handleChange} 
              value={this.state.bday}
            />
             <Divider/>
              
              <Input className="inputDatas" required id="standard-required" placeholder="Contact No." name="cpnum" onChange={this.handleChange} value={this.state.cpnum} />
  
              <Input className="inputDatas" required id="standard-required" placeholder="Address" name="address" onChange={this.handleChange} value={this.state.address} />
               <Divider/>
               <h4>User Credentials</h4>
               
               
               <Input className="inputDatas" required id="standard-required" autoComplete="off" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.email} />
              
               
               <Input className="inputDatas" required id="standard-required" placeholder="Password" label="Password" name="password" type="password" onChange={this.handleChange} value={this.state.password} />
               <Divider/>
                <button>Add Employee</button>
              </form>
              </CardContent>
         </Card>
       
      </div>
    );
  }
}
export default AddEmployee;