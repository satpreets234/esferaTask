// src/components/UserForm.js
import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './DetailedForm.css';

const UserForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.number().min(2,'Invalid Age must be greater than 100').max(100,'Invalid Age must be less than 100').required('Age is required').positive().integer(),
    addresses: Yup.array().of(
      Yup.object({
        houseNo: Yup.string().required('House No. is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
      })
    )
  });

  const navigate= useNavigate();

  return (
    <div className="form-container">
      <h1>{initialValues ? 'Edit User' : 'Add User'}</h1>
      <Formik
        initialValues={initialValues || {
          name: '',
          age: '',
          addresses: [{ houseNo: '', city: '', state: '', country: '' }],
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
          navigate('/');
        }}
      >
        {({ values }) => (
          <Form>
            <div>
              <label>Name</label>
              <Field name="name" type="text" />
              <ErrorMessage className="error-message"  name="name" component="div" />
            </div>

            <div>
              <label>Age</label>
              <Field name="age" type="number" />
              <ErrorMessage className="error-message"  name="age" component="div" />
            </div>

            <FieldArray name="addresses">
              {({ push, remove }) => (
                <div>
                  <h3>Addresses</h3>
                  {values.addresses.map((address, index) => (
                    <div key={index}>
                      <label>House No</label>
                      <Field name={`addresses[${index}].houseNo`} type="text" />
                      <ErrorMessage className="error-message"  name={`addresses[${index}].houseNo`} component="div" />

                      <label>City</label>
                      <Field name={`addresses[${index}].city`} type="text" />
                      <ErrorMessage className="error-message"  name={`addresses[${index}].city`} component="div" />

                      <label>State</label>
                      <Field name={`addresses[${index}].state`} type="text" />
                      <ErrorMessage className="error-message"  name={`addresses[${index}].state`} component="div" />

                      <label>Country</label>
                      <Field name={`addresses[${index}].country`} type="text" />
                      <ErrorMessage className="error-message"  name={`addresses[${index}].country`} component="div" />

                      <button type="button" onClick={() => remove(index)}>Remove Address</button>
                    </div>
                  ))}
                  
                  <button type="button" onClick={() => push({ houseNo: '', city: '', state: '', country: '' })}>
                    Add More Address
                  </button>
                </div>
              )}
            </FieldArray>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
