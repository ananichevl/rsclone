import React, { useState } from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SimpleButton from '../SimpleButton';
import SimpleInput from '../SimpleInput';

const Column: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [columnName, setColumnName] = useState<string>('');

  const tasks = React.useMemo(() => new Array(counter).fill(<Card title={<span className="title" contentEditable="true">Новая задача</span>} />), [counter]);
  return (
    <>
      <div>
        <Card className="board-column" title={<span className="title" contentEditable="true">{columnName}</span>} bordered={false} style={{ background: '#1890ff' }}>
          <SimpleInput setColumnHeader={setColumnName} placeholder="Добавить название" />
          {tasks}
          <SimpleButton action={() => setCounter(counter + 1)} title="Добавить задачу" icon={<PlusOutlined />} />
        </Card>
      </div>
    </>
  );
};

export default Column;
