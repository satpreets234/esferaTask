// src/App.js
import React, { useState ,useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes ,useNavigate } from 'react-router-dom';
import UserList from './components/UsersList/UsersList';
import UserForm from './components/DetailedForm/DetailedForm';
import EditUser from './components/EditUserDetail/EditUserDetail';
const App = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);
  const handleAddUser = (user) => {
    const updatedUsers = [...users, user];

    setUsers(updatedUsers);

    localStorage.setItem('users', JSON.stringify(updatedUsers));

  };



  const handleDeleteUser = (index) => {

    const updatedUsers = users.filter((_, i) => i !== index);

    setUsers(updatedUsers);

    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };



  const handleUpdateUser = (index, updatedUser) => {
    const updatedUsers = users.map((user, i) => (i === index ? updatedUser : user));
    console.log(updatedUser,742);

    setUsers(updatedUsers);

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    // navigate('/')

  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserList users={users} onDelete={handleDeleteUser} />}>
       
        </Route>
        <Route path="/add-user" element={ <UserForm onSubmit={handleAddUser} />}>
         
        </Route>
        <Route path="/edit-user/:index" element={<EditUser users={users} setUsers={setUsers} onUpdate={handleUpdateUser} />}>
          
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
