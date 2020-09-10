import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.less';

import NavBar from './components/common/NavBar';
import { NotFoundPage } from './components/pages/NotFound';
import { HomePage } from './components/pages/Home';
import { LoadingComponent } from './components/common';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.

  return (
    <Router>
      <NavBar />
      <Switch>
        {/* any of the routes you need secured should be registered as Routes */}
        <Route
          exact
          path="/"
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}
