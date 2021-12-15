import React, { useState } from 'react';
import { useGlobalContext } from '../context';
import { Link } from 'react-router-dom';

const Login = () => {
  const { loginUser, error, errorMessage } = useGlobalContext();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  return (
    <section className='login-group'>
      <article className='login-input-group'>
        <label htmlFor='emailInput'>Email: </label>
        <input
          className='credentials-input'
          name='emailInput'
          type='email'
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </article>
      <article className='login-input-group'>
        <label htmlFor='passwordInput'>Password: </label>
        <input
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
        className='login-btn'
        onClick={() => {
          loginUser(credentials);
        }}
      >
        Login
      </button>
      <span style={{ marginLeft: '15px' }}>
        Don't have an account yet? Register <Link to='/register'>here!</Link>
      </span>
      {error ? <div>{errorMessage}</div> : null}
    </section>
  );
};

export default Login;
