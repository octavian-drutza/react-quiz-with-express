import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from './context';

const Navbar = () => {
  const { loggedUser, logoutUser } = useGlobalContext();
  return (
    <nav className='navbar'>
      <Link style={{ margin: '15px' }} to='/'>
        Home
      </Link>
      <Link style={{ margin: '15px' }} to='/edit-list'>
        Edit Quizes
      </Link>
      <Link style={{ margin: '15px' }} to='/quiz-list'>
        View Quizes
      </Link>
      {loggedUser ? (
        <div style={{ margin: '15px' }}>
          <span>User ID: {loggedUser}</span>
          <button className='logout-btn' onClick={logoutUser}>
            Logout
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
