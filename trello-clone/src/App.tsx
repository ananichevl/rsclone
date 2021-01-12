import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Layout } from 'antd';
import Dashboard from './pages/Dashboard'
import Board from './pages/Board'

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (<BrowserRouter>
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Navbar />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <Switch>
          <Route component={Dashboard} path="/" exact />
          <Route component={Board} path="/board" />
        </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </BrowserRouter>
  )
}

export default App
