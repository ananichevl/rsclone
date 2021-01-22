import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import Board from './pages/board/Board';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => (
  <BrowserRouter>
    <Layout className="layout">
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Navbar />
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px', marginTop: 64,
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24, minHeight: 380, backgroundAttachment: 'fixed',
          }}
        >
          <Switch>
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
