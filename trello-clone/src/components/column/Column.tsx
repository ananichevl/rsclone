import React, { useState } from 'react';
import {
  Card, Modal, Button, Input,
} from 'antd';
import {
  PlusOutlined,
  CheckOutlined,
  AlignLeftOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import SimpleInput from '../simpleInput/SimpleInput';
import Task from '../task/Task';
import './column.scss';
import { addColumn } from '../../service/Service';

const { TextArea } = Input;

interface IColumnProps {
  boardId: string
  columnTitle: string
  propColumnId: string
}

const Column: React.FC<IColumnProps> = ({ boardId, columnTitle, propColumnId }) => {
  const [currentTask, setCurrentTask] = useState('');
  const [counter, setCounter] = useState<number>(0);
  const [columnId, setColumnId] = useState(propColumnId || '');
  const [columnName, setColumnName] = useState<string>(columnTitle || '');
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(!columnTitle);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (task: string) => {
    setCurrentTask(task);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCheck = async () => {
    const result = await addColumn(boardId, columnName);
    setColumnId(result.id);
    setIsInputTitleVisible(false);
  };

  const tasks = React.useMemo(() => new Array(counter).fill(
    <Task onClick={showModal} boardId={boardId} columnId={columnId} />,
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
              <Button
                icon={<CheckOutlined />}
                onClick={handleCheck}
              />
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
        title={(
          <>
            <ProjectOutlined className="icon-task-title" />
            {currentTask}
          </>
        )}
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" onClick={handleCancel}>
            Сохранить
          </Button>,
        ]}
      >
        <div className="description">
          <AlignLeftOutlined className="icon-description" />
          Описание:
        </div>
        <TextArea rows={4} />
      </Modal>
    </>
  );
};

export default Column;
