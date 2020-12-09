import { hot } from 'react-hot-loader/root';
import ErrorBoundary from 'react-error-boundary';

import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';

import Moment from 'moment';

Moment.locale('fr');

import Layout from './layout/default/Layout';
import Home from './pages/home/Home';
import {
  Fallback
} from './components';

const Routes = () => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" component={Home}/>
          </Switch>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default hot(Routes);