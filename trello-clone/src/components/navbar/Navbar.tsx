import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Button, Menu, Dropdown,
} from 'antd';
import { HomeOutlined, GlobalOutlined, LogoutOutlined } from '@ant-design/icons';
import i18n from '../../i18n';
import './navbar.scss';
import en from '../../utils/img/england_PNG50.png';
import ru from '../../utils/img/flag-round-250.png';
import ua from '../../utils/img/197572.png';

const Navbar: React.FC = () => {
  const history = useHistory();
  const changeLanguage = (ln: string) => i18n.changeLanguage(ln);
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => changeLanguage('en')}>
        <img src={en} alt="en" className="icon-lang" />
        English
      </Menu.Item>
      <Menu.Item key="2" onClick={() => changeLanguage('ru')}>
        <img src={ru} alt="ru" className="icon-lang" />
        Русский
      </Menu.Item>
      <Menu.Item key="2" onClick={() => changeLanguage('ua')}>
        <img src={ua} alt="ua" className="icon-lang" />
        Українська
      </Menu.Item>
    </Menu>
  );

  const onLogout = () => {
    document.cookie.split(';')
      .forEach((c) => {
        document.cookie = c.replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
    history.push('/login');
  };

  return (
    <div className="header">
      <div className="menu-item">
        <NavLink to="/">
          <HomeOutlined style={{ fontSize: '16px', color: '#fff' }} />
        </NavLink>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="text">
            <GlobalOutlined style={{ fontSize: '16px', color: '#fff' }} />
          </Button>
        </Dropdown>
      </div>
      <div style={{ display: 'flex' }}>
        <Button className="menu-item" type="text" onClick={onLogout} style={{ marginRight: 50 }}>
          <LogoutOutlined style={{ fontSize: '16px', color: '#fff' }} />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
