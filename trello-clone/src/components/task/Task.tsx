import React from 'react';
import { Card } from 'antd';

interface ITaskProps {
  onClick: () => void
}

const Task: React.FC<ITaskProps> = ({ onClick }) => (
  <Card title={<span className="title" contentEditable="true">Новая задача</span>} onClick={onClick} />
);

export default Task;
