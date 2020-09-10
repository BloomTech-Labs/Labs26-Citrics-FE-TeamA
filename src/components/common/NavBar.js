import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import './styles/NavBar.scss';

const { Header } = Layout;

function NavBar() {
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1" className="link">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" className="link">
            <Link to="/about-us">About Us</Link>
          </Menu.Item>
          <Menu.Item key="3" className="link">
            <Link to="/why-citrics"> Why Citrics?</Link>
          </Menu.Item>
          <h1 className="title" selectable="false">
            Citrics
          </h1>
        </Menu>
      </Header>
    </Layout>
  );
}

export default NavBar;
