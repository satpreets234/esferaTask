import React from 'react';
import { useParams, } from 'react-router-dom';
import UserForm from '../DetailedForm/DetailedForm';

const EditUser = ({ users, onUpdate }) => {
  const { index } = useParams();
  const user = users[index];

  const handleSubmit = (updatedUser) => {
    onUpdate(parseInt(index), updatedUser); // Ensure the index is parsed as an integer
  };

  return user ? <UserForm initialValues={user} onSubmit={handleSubmit} /> : <div>Loading...</div>;
};

export default EditUser;