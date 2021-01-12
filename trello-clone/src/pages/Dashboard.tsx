import React from 'react';
import { NavLink } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import SimpleButton from '../components/AddButton';

const Dashboard: React.FC = () => (
  <>
    <h4>Доски</h4>
    <NavLink to="/board">
      <SimpleButton title="Создать доску" icon={<PlusOutlined />} />
    </NavLink>
  </>
);

export default Dashboard;
