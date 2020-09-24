import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import './styles/NavBar.scss';

const { Header } = Layout;

function NavBar() {
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" className="link">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" className="link">
            <Link to="/about-us">About Us</Link>
          </Menu.Item>
          <Link to="/">
            <img
              className="citrics-logo"
              alt="citrics-logo"
              src="https://i.ibb.co/ZM3PFF6/citrics-logo.png"
            />
          </Link>
        </Menu>
      </Header>
    </Layout>
  );
}

export default NavBar;
