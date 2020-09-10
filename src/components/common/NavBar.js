import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

const { Header } = Layout;

// import './NavBar.scss';

function NavBar() {
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link exact path="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link exact path="/about-us">
              About Us
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link exact path="/why-citrics">
              Why Citrics?
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}

export default NavBar;
