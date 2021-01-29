import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import Board from './pages/board/Board';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => (
  <BrowserRouter>
    <Layout className="layout">
      <Header className="header">
        <div className="logo" />
        <Navbar />
      </Header>
      <Content
        className="site-layout"
      >
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
      </Content>
      <Footer className="footer" style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </BrowserRouter>
);

export default App;
