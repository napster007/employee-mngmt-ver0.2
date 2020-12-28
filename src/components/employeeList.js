
import React, { Component,useState }  from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EmployeesData from './employeesData';
import {  withRouter,Redirect, Switch, Route, Link, BrowserRouter as Router } from "react-router-dom"; 
import app from '../firebase.js'; 


const columns = [
  { id: 'fname', label: 'First Name', minWidth: 100 },
  { id: 'mname', label: 'Middle Name', minWidth: 100 },
  { id: 'lname', label: 'Last Name', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'cnum',
    label: 'Contact #',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'action',
    label: 'Action',
    minWidth: 100,
    align: 'center',
  }
];



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  container: {
    width:'100%',
    minWidth:900,
    maxHeight: 440,
  },
  app:{
    width:'100%',
    minWidth:950
  },
  
}));


class EmployeeList extends Component {
  

  constructor() {
    super();
    this.state = {
      fname: '',
      lname: '',
      users: []
    }
    this.handleChange = this.handleChange.bind(this);
   
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  componentDidMount(){
    const UsersRef = app.database().ref('users');
    UsersRef.on('value', (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      for (let userId in users) {
        newState.push({
          id: userId,
          fname: users[userId].fname,
          mname: users[userId].mname,
          lname: users[userId].lname,
          bday: users[userId].bday,
          email: users[userId].email,
          cpnum: users[userId].cpnum,
          address: users[userId].address,
        });
      }
      this.setState({
        users: newState
      });
    });
  };

  removeItem(userId) {
    const itemRef = app.database().ref(`/users/${userId}`);
    itemRef.remove();
  };

  /* handleEditUpt (userId){
    
    this.props.history.push(`/edit-employee/${userId}` );
    userId="";
  }; */

  

  

 
  render() {
    
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Employee List</h1>
              
            </div>
        </header>
        <div className='container'>
      
          <section className='display-item'>
              <div className="wrapper">
              <Router>
                <TableContainer className={useStyles.container}>
                  <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                    <TableBody>
                  
                    {this.state.users.map((users) => {
                    return (
                      <TableRow hover role="checkbox" key={users.id}>
                          <TableCell key={columns.id} align={columns.align}>
                          <p>{users.fname}</p>
                          </TableCell>

                          <TableCell key={columns.id} align={columns.align}>
                          <p>{users.mname}</p>
                          </TableCell>

                          <TableCell key={columns.id} align={columns.align}>
                          <p>{users.lname}</p>
                          </TableCell>

                          <TableCell key={columns.id} align={columns.align}>
                          <p>{users.email}</p>
                          </TableCell>

                          <TableCell key={columns.id} align={columns.align}>
                          <p>{users.cpnum}</p>
                          </TableCell>

                          <TableCell key={columns.id} align={columns.align}>
                          <Link to={"/edit-employee/"+users.id} className="nav-link">
                            <button className='btns'>Update</button>
                          </Link>
                          <button className='btns' onClick={() => this.removeItem(users.id)}>Remove</button>
                          </TableCell>
                        
                          
                     
                      </TableRow>
                    )
                  })} 
                    
                    <Switch>
                      <Route exact path="/edit-employee/:id" component={EmployeesData}>
                        <EmployeesData />
                      </Route>
                    </Switch>
                   
                    </TableBody>

                   
                  </Table>
                </TableContainer>

              
                </Router>  
                
  
              </div>
          </section>
        </div>
      </div>
    );
  }
}
export default withRouter(EmployeeList);