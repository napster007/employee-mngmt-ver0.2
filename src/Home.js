import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Redirect, Switch, Route, Link, BrowserRouter as Router } from "react-router-dom"; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import AddEmployee from "./components/addEmployee";
import EmployeeList from "./components/employeeList";
import auth, { AuthContext } from './Authentication';
import app from "./firebase.js";
import render from 'react-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,

  },
  nav_menu:{
    width: '100%',
    maxWidth: "350px",
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logOut:{
    color: "white",
    top: "50%",
    height: 30,
    float: "right",
    marginLeft: theme.spacing(2),
  },
  card_cont: {
    height:"10%",
    width:"30%",
    margin:"0 auto",

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

 

export default function SelectedListItem() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.root}>
        <AppBar position="static" component="nav">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           
          </IconButton>
         
         
          <Typography variant="h6" className={classes.title}>
          <div className="welcome-tag"> </div>

          {
            app.auth().onAuthStateChanged(function(user) {
              const userDetails = document.querySelector('.welcome-tag');
                if (user) {
                            // User is signed in.
                            const html = `
                            <div> ${user.emal}</div>
                            `;
                          /*  console.log(user.uid); */
                         /*  window.myGlobalVariable = user.uid; */

                          userDetails.innerHTML = "Welcome " + user.email;
                  } else {
                    // No user is signed in.
                    <Redirect to={"/signin"} />
                  }
              }
            ) 
          }
           
          </Typography>
         

          <Button placement="right-start" className={classes.logOut} color="inherit" onClick={() => app.auth().signOut()} >Logout</Button>
          </Toolbar>
      
      
      

      </AppBar>
     
      <Router>
      <List component="nav"  className={classes.nav_menu} >
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <Link to={"/add-employee"} className="nav-link">
            <ListItemText primary="Add Employee" />
            </Link>
          
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <Link to={"/employee-list"} className="nav-link">
          <ListItemText primary="Employee List" />
          </Link>
        </ListItem>

      {/*   <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}

          id="linkss"
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>

          
        
            

          <Link  to={"/account/"+ auth.userId} className="nav-link">
            <ListItemText primary="Account" />
          </Link>
        </ListItem> */}
      </List>

        <hr />
        <Card className={classes.card_cont} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            Welcome and Happy holidays
            </Typography>
            
            <Typography className={classes.pos} color="textSecondary">
              Click ADD EMPLOYEE to and new employee
            </Typography>
            <Typography variant="body2" component="p">
            Click EMPLOYEE LIST to view and update certain user
            
            </Typography>
          </CardContent>
        </Card>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route path="/employee-list" component={EmployeeList}>
            <EmployeeList />
          </Route>
          <Route path="/add-employee" exact component={AddEmployee}>
            <AddEmployee />
          </Route>

         
         
        </Switch>
     
    </Router>
      <Divider className={classes.nav_menu} />
    


          
    </div>
  );
}

