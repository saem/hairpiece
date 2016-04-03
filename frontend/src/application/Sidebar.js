import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const Sidebar = (props) => (
  <span>
    <h1>Pick Something</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/settings">Settings</Link></li>
      <li><Link to="/meetings">Meeting</Link></li>
    </ul>
  </span>
);
