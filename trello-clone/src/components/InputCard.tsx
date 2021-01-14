import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import SimpleInput from './Input';

const InputCard: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Collapse isOpened={!open}>
        <div style={{ width: '270px' }}>
          <SimpleInput placeholder="Ввести заголовок списка" />
          <Button type="primary" style={{ margin: '10px', backgroundColor: '#5AAC44' }}>
            Добавить список
          </Button>
          <Button onClick={() => setOpen(!open)} type="primary" shape="circle" icon={<CloseOutlined />} />
        </div>
      </Collapse>
    </>
  );
};

export default InputCard;
