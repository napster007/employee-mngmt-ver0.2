import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home'
import SignIn from './SignIn'
import AuthProvider from './Authentication';
import PrivateRoute from './PrivateRoute';
function App() {
  return (
    <AuthProvider>
    <Router>
       <div>
         <PrivateRoute exact path="/" component={Home} />
         <Route exact path="/signin" component={SignIn} />
        
      </div>
    </Router>
</AuthProvider>
  );
}
export default App;