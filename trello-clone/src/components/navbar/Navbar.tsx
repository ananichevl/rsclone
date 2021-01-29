import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Button, Menu, Dropdown, Drawer,
} from 'antd';
import { HomeOutlined, GlobalOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import './navbar.scss';
import colors from '../../utils/colors/colors';
import en from '../../utils/img/england_PNG50.png';
import ru from '../../utils/img/flag-round-250.png';
import ua from '../../utils/img/197572.png';

const Navbar: React.FC = () => {
  const history = useHistory();
  const changeLanguage = (ln: string) => i18n.changeLanguage(ln);
  const { t } = useTranslation();
  const [openColorOption, setOpenColorOption] = useState(false);

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

  const openColorOptions = () => {
    setOpenColorOption(true);
  };

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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
        <div className="menu-item__bgcolors" style={{ marginRight: '70px' }}>
          <Button type="primary" onClick={showDrawer}>
            {t('change_background')}
          </Button>
          <Drawer
            title={t('change_background')}
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            width="400px"
          >
            <div className="bgMenuContainer">
              <div
                role="button"
                onKeyUp={(e) => console.log(e)}
                tabIndex={0}
                className="bgMenuItem"
                style={{ backgroundImage: 'url(https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)' }}
                onClick={openColorOptions}
              >
                <span>photos</span>
              </div>
              <div
                role="button"
                onKeyUp={(e) => console.log(e)}
                tabIndex={0}
                className="bgMenuItem"
                style={{ backgroundImage: 'url(https://images.pexels.com/photos/226589/pexels-photo-226589.jpeg?cs=srgb&dl=closeup-photo-of-multi-color-stick-226589.jpg&fm=jpg)' }}
                onClick={openColorOptions}
              >
                <span>colors</span>
              </div>
            </div>
            <div className="bgMenuContainer" style={{ display: openColorOption ? 'flex' : 'none', outline: 'none' }}>
              {colors.map((color) => (
                <div
                  role="button"
                  onKeyUp={(e) => console.log(e)}
                  tabIndex={0}
                  className="bgItem"
                  onClick={() => console.log(color)}
                  style={{ backgroundColor: color }}
                >
                  <span />
                </div>
              ))}
            </div>
          </Drawer>
        </div>
        <Button className="menu-item" type="text" onClick={onLogout} style={{ marginRight: 50 }}>
          <LogoutOutlined style={{ fontSize: '16px', color: '#fff' }} />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
