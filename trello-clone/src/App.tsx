import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/navbar/Navbar';
import Wrapper from './pages/Wrapper';

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
        <Wrapper />
      </Content>
      <Footer className="footer" style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </BrowserRouter>
);

export default App;
