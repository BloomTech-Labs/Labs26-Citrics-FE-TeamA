import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.less';
import { BackTop } from 'antd';
import { UpCircleTwoTone } from '@ant-design/icons';

import { NotFoundPage } from './components/pages/NotFound';
import RenderHomePage from './components/pages/Home/RenderHomePage';
import AboutUs from './components/pages/About/AboutUs';

import NavBar from './components/common/NavBar';
import { LoadingComponent } from './components/common';

import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
  };

  return (
    <Router>
      <NavBar />
      <Switch>
        {/* any of the routes you need secured should be registered as Routes */}
        <Route
          exact
          path="/about-us"
          component={() => <AboutUs LoadingComponent={LoadingComponent} />}
        />
        <Route
          exact
          path="/"
          component={() => (
            <RenderHomePage LoadingComponent={LoadingComponent} />
          )}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <BackTop>
        <div style={style} data-testid="scroll-to-top">
          <UpCircleTwoTone />
        </div>
      </BackTop>
    </Router>
  );
}
