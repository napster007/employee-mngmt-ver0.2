import React, { useEffect, useState } from "react";
import app from "./firebase.js";
export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  
  useEffect(() => {
    //if user is loged in
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
      this.setState({ userId: user.uid});

    
    });
  }, []);

  if(pending){
    return <>Please wait...</>
    
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
      
  
    </AuthContext.Provider>

      
  );
};




export default AuthProvider;