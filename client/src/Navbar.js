import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link style={{ margin: '15px' }} to='/'>
        Home
      </Link>
      <Link style={{ margin: '15px' }} to='/edit-list'>
        Edit Quizes
      </Link>
      <Link style={{ margin: '15px' }} to='/quiz-list'>
        View Quizes
      </Link>
    </nav>
  );
};

export default Navbar;
