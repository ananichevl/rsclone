import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import './navbar.scss';

const Navbar: React.FC = () => (
  <div className="header">
    <div className="menu-item">
      <NavLink to="/">
        <HomeOutlined style={{ fontSize: '16px', color: '#fff' }} />
      </NavLink>
    </div>
  </div>
);

export default Navbar;
