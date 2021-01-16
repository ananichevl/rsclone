import React, { useState } from 'react';
import { Card, Collapse } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SimpleButton from '../SimpleButton';
import SimpleInput from '../SimpleInput';

const { Panel } = Collapse;

const Column: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [columnName, setColumnName] = useState<string>('');

  const tasks = React.useMemo(() => new Array(counter).fill(<Card title={<span className="title" contentEditable="true">Новая задача</span>} />), [counter]);
  return (
    <>
      <Card
        className="board-column"
        title={(
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header={columnName} key="1">
              <SimpleInput setColumnHeader={setColumnName} placeholder="Добавить название" />
            </Panel>
          </Collapse>
      )}
        bordered={false}
        style={{ background: '#1890ff' }}
      >
        {tasks}
        <SimpleButton action={() => setCounter(counter + 1)} title="Добавить задачу" icon={<PlusOutlined />} />
      </Card>
    </>
  );
};

export default Column;
