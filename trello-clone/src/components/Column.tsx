import React from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SimpleButton from './AddButton';

const Column: React.FC = () => (
  <>
    <div>
      <Card title={<span className="title" contentEditable="true">Новая доска</span>} bordered={false} style={{ width: 270, background: '#EBECF0' }}>
        <SimpleButton title="Добавить задачу" icon={<PlusOutlined />} />
      </Card>
    </div>
  </>
);

export default Column;
