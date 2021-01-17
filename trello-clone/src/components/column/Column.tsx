import React, { useState } from 'react';
import {
  Card, Modal, Button,
} from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import SimpleInput from '../simpleInput/SimpleInput';
import Task from '../task/Task';
import './column.scss';

const Column: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [columnName, setColumnName] = useState<string>('');
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log(columnName);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const tasks = React.useMemo(() => new Array(counter).fill(
    <Task onClick={showModal} />,
  ), [counter]);
  return (
    <>
      <Card
        style={{ marginRight: 16 }}
        className="board-column"
        title={(
          <div>
            <div className="board-column__title" style={{ display: isInputTitleVisible ? 'flex' : 'none' }}>
              <div>
                <SimpleInput onChange={(value) => setColumnName(value)} placeholder="Добавить название" />
              </div>
              <Button icon={<CheckOutlined />} onClick={() => setIsInputTitleVisible(false)} />
            </div>
            <div style={{ display: isInputTitleVisible ? 'none' : 'flex' }}>{columnName}</div>
          </div>
        )}
        bordered={false}
      >
        {tasks}
        <Button
          onClick={() => setCounter(counter + 1)}
          icon={<PlusOutlined />}
          style={{ width: '100%', textAlign: 'left' }}
        >
          Добавить задачу
        </Button>
      </Card>
      <Modal
        title="Задача"
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        Text
      </Modal>
    </>
  );
};

export default Column;
