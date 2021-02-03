import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Board from './board/Board';
import Login from './login/Login';
import SignUp from './signUp/SignUp';

const Wrapper: React.FC = () => (
  <div className="wrapper">
    <div
      className="site-layout-content"
    >
      <Switch>
        <Route component={Login} path="/login" />
        <Route component={SignUp} path="/signUp" />
        <Route component={Dashboard} path="/" exact />
        <Route component={Board} path="/board/:id" />
      </Switch>
    </div>
  </div>
);

export default Wrapper;
