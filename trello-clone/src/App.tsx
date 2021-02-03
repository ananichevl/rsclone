import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/navbar/Navbar';
import Wrapper from './pages/Wrapper';
import logo from './utils/img/rs_school_js.svg';
import ghImg from './utils/img/GitHub-Mark.png';

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
      <Footer className="footer">
        <a href="https://github.com/SuzyGRBT" target="_blank" rel="noreferrer" className="footer-item">
          <img src={ghImg} alt="Suzanna" height="30px" width="30px" />
        </a>
        <a href="https://github.com/ananichevl" target="_blank" rel="noreferrer" className="footer-item">
          <img src={ghImg} alt="Leonid" height="30px" width="30px" />
        </a>
        <a href="https://github.com/Illenata" target="_blank" rel="noreferrer" className="footer-item">
          <img src={ghImg} alt="Nataliia" height="30px" width="30px" />
        </a>
        <p className="footer-item">2020</p>
        <a href="https://rs.school/js/" target="_blank" rel="noreferrer" className="footer-item">
          <img src={logo} alt="rs-school" height="30px" width="60px" />
        </a>
      </Footer>
    </Layout>
  </BrowserRouter>
);

export default App;
