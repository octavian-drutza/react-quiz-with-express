import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';

const Register = () => {
  const { registerUser, error, errorMessage } = useGlobalContext();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  return (
    <section className='register-group'>
      <h3>Register</h3>
      <article className='register-input-group'>
        <label htmlFor='emailInput'>Email: </label>
        <input
          autoComplete='off'
          className='credentials-input'
          name='emailInput'
          type='email'
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </article>
      <article className='register-input-group'>
        <label htmlFor='passwordInput'>Password: </label>
        <input
          autoComplete='new-password'
          className='credentials-input'
          name='emailInput'
          type='password'
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </article>
      <button
        className='register-btn'
        onClick={() => {
          registerUser(credentials);
        }}
      >
        Register
      </button>
      {error ? <div>{errorMessage}</div> : null}
    </section>
  );
};

export default Register;
