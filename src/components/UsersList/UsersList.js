// src/components/UserList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './UserList.css';

const UserList = ({ users, onDelete }) => {
  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <Link to="/add-user" className="add-user-link">Add User</Link>
      <ul>
        {users?.length >0 ?
        users?.map((user, index) => (
          <li key={index}>
            <h2>{user.name}</h2>
            <p>Age: {user.age}</p>
            <h3>Addresses:</h3>
            <ul>
              {user.addresses.map((address, addrIndex) => (
                <li key={addrIndex}>
                  {address.houseNo}, {address.city}, {address.state}, {address.country}
                </li>
              ))}
            </ul>
            <button onClick={() => onDelete(index)}>Delete</button>
            <Link to={`/edit-user/${index}`}>Edit</Link>
          </li>
        )):<div style={{display:'flex', alignItems:'center' ,justifyContent:'center'}}>No Users Found</div>}
      </ul>
    </div>
  );
};

export default UserList;
