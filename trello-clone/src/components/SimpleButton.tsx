import React from 'react';
import { Button } from 'antd';

interface IButtonProps {
  action(): void
  title: string
  icon?: React.ReactNode
}

const SimpleButton: React.FC<IButtonProps> = ({ action, title, icon }) => (
  <>
    <Button onClick={action} icon={icon}>
      {title}
    </Button>
  </>
);

export default SimpleButton;
