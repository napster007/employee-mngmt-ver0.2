 import React, { Component }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
      utype:'',
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
    var fname = this.state.fname;
     var mname= this.state.mname;
      var lname= this.state.lname;
     var bday= this.state.bday;
      var email= this.state.email;
      var cpnum=this.state.cpnum;
      var address=this.state.address;
      var password=this.state.password;
      var utype= this.state.utype;
    const item = {
      email: this.state.email,
      password:this.state.password,
    }
     app.auth().createUserWithEmailAndPassword(item.email,item.password).then(cred => {
      //console.log(cred.user.uid);
      var useruId = cred.user.uid;
      logUser(useruId); 
       
 
   
    });


function logUser(useruId) {
    var ref = app.database().ref("users");
    var obj = {
        fname:fname,
      mname: mname,
      lname: lname,
      bday: bday,
      email: email,
      cpnum:cpnum,
      address:address,
      password:password,
      uid:useruId,
      utype:utype,
    };
    ref.push(obj);
}
 
    /*  const item2 = {
      fname: this.state.fname,
      mname: this.state.mname,
      lname: this.state.lname,
      bday: this.state.bday,
      email: this.state.email,
      cpnum:this.state.cpnum,
      address:this.state.address,
      password:this.state.password,
      uid: this.uid,
      
    }
    itemsRef.push(item2); */
    this.setState({
      fname: '',
      mname:'',
      lname: '',
      bday: '',
      email: '',
      cpnum:'',
      address:'',
      password:'',
      uid:'',
      utype:'',
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
                <Divider/>
                 <h4>User Type</h4>
                   
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="utype"
                value={this.state.utype}
                onChange={this.handleChange}
              >
                <MenuItem value={"admin"}>ADMIN</MenuItem>
                <MenuItem value={"employee"}>EMPLOYEE</MenuItem>
                
              </Select>
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