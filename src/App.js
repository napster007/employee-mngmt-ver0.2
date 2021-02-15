import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home'
import SignIn from './SignIn'
import AuthProvider from './Authentication';
import PrivateRoute from './PrivateRoute';
import EmployeeList from './components/employeeList';
import AddEmployeeList from './components/addEmployee';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/employee-list" component={EmployeeList} />
          <Route exact path="/add-employee" component={AddEmployeeList} />
          
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;