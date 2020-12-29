

 
import React from 'react';
import { Component }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import { withRouter } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import EmployeeService from '../service/employees.service'; 
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom"; 
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));





class EmployeesData extends Component {

  emptyEmployee = {
    key: '',
    fname: '',
    mname:'',
    lname: '',
    email: '',
    cpnum:'',
    address: '',
    password:'',
    utype:''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyEmployee
    };
  }

  componentDidMount = () => {
    let key = this.props.match.params.id;
    EmployeeService.get(key).on("value", this.onDataChange);
   
  }
  
  componentWillUnmount = () => {
    EmployeeService.getAll().off("value", this.onDataChange);
  }

  onDataChange = (item) => {
    let data = item.val();
    let employee = {
      key: item.key,
      fname: data.fname,
      mname: data.mname,
      lname: data.lname,
      bday: data.bday,
      email: data.email,
      cpnum: data.cpnum,
      address: data.address,
      password:data.password,
      utype:data.utype,
     
    };

    this.setState({
      item: employee,
    });
  }

   
  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {item} = this.state;
    let key = this.props.match.params.id
      EmployeeService.update(key, item);
    this.props.history.push('/employee-list');
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push('/employee-list');
    e.target.id = "";
  };
  render() {
    const {item} = this.state;
    const title = <h2>Edit Employee</h2>;
    return (
      <div className='edit-form-wrapper'>
        
        <Card className='edit-form-cont'>
        <header>
            <div className='wrapper'>
              {title}
              
            </div>
        </header>
          <CardContent >
              <form onSubmit={this.handleSubmit} >
              <InputLabel htmlFor="component-simple">First Name</InputLabel>
              <Input required id="standard-required" placeholder="First Name"  name="fname" onChange={this.handleChange}  value={item.fname } />
              <InputLabel htmlFor="component-simple">Middle Name</InputLabel>
              <Input required id="standard-basic" label="Middle Name" name="mname" onChange={this.handleChange} value={item.mname } />
              <InputLabel htmlFor="component-simple">Last Name</InputLabel>
              <Input required id="standard-required" label="Last Name" name="lname" onChange={this.handleChange} value={item.lname } />
              <Divider/>
              <InputLabel htmlFor="component-simple">Birthday</InputLabel>
              <TextField
              id="date"
              type="date"
              name="bday"
              defaultValue="2017-05-24"
              
              InputLabelProps={{
                shrink: true,
              }}

              onChange={this.handleChange} 
              value={item.bday }
            />
             <Divider/>
             <InputLabel htmlFor="component-simple">Contact No.</InputLabel>
              <Input required id="standard-required" label="Contact No." type="number" name="cpnum" onChange={this.handleChange}   value={item.cpnum } />
              <Divider/>
              <InputLabel htmlFor="component-simple">Address</InputLabel>
              <Input required id="standard-required" label="Address" name="address" onChange={this.handleChange} value={item.address} />
              <Divider/> 
              <h4>User Type</h4>
                   
                   <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     name="utype"
                     value={item.utype}
                     onChange={this.handleChange}
                   >
                     <MenuItem value={"admin"}>ADMIN</MenuItem>
                     <MenuItem value={"employee"}>EMPLOYEE</MenuItem>
                     
                   </Select>
                     <Divider/>
              <InputLabel htmlFor="component-simple">Email</InputLabel>
               <Input required id="standard-required" placeholder="Email" type="email" name="email" onChange={this.handleChange} value={item.email} />
               <InputLabel htmlFor="component-simple">Password</InputLabel>
               <Input required id="standard-required" placeholder="Password" name="password" autoComplete="off" type="password" onChange={this.handleChange} value={item.password} />
               <Divider/>  
                <button type="Submit">Update Employee</button>
               
                <Button to="/employee-list" id={item.key} onClick={this.handleCancel}>Cancel</Button>
               

               
         
             
              </form>
              </CardContent>
         </Card>
       
      </div>
    );
  }
}
export default withRouter(EmployeesData);

