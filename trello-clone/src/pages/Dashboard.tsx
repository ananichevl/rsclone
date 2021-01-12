import React from 'react'
import { NavLink } from 'react-router-dom';
import SimpleButton from '../components/AddButton'
import { PlusOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => (
  <>
    <h4>Доски</h4>
    <NavLink to="/board">
      <SimpleButton title="Создать доску" icon={ <PlusOutlined /> }/>
    </NavLink>
  </>
)

export default Dashboard