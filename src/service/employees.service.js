import firebase from '../firebase';

const db = firebase.database().ref('/users');


class EmployeeService {
  
  

  getAll() {
    return db;
  };

  get(key) {
    return db.child(key);
  };

  update(key, value) {
    return db.child(key).update(value);
  };

  
}

export default new EmployeeService();