import React from 'react'
import { NavLink } from 'react-router-dom';
import SimpleButton from '../components/AddButton'

const Dashboard: React.FC = () => (
  <>
    <h5>Доски</h5>
      <SimpleButton title="Создать доску"/>
  </>
)

export default Dashboard