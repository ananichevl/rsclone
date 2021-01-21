import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  Button, Card, Modal, Input,
} from 'antd';
import {
  CheckOutlined, EditOutlined, AlignLeftOutlined, ProjectOutlined,
} from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';
import SimpleInput from '../simpleInput/SimpleInput';
import { createTask } from '../../service/Service';

const { TextArea } = Input;

interface ITaskProps {
  onClick: (task: string) => void
  boardId: string
  columnId: string
  taskProp: TaskModel
  index: number
  updateColumn: Dispatch<SetStateAction<TaskModel[]>>
}

export interface TaskModel {
  id: string
  title?: string
}

const Task: React.FC<ITaskProps> = ({
  boardId, columnId, taskProp, index, updateColumn,
}) => {
  const [taskName, setTaskName] = useState<string>(taskProp.title || '');
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(!taskProp.title);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    setTaskName(taskProp.title || '');
  }, [taskProp.title]);

  const handleCreateTask = async () => {
    const task = await createTask(boardId, columnId, taskName);
    updateColumn((prevState) => [...prevState.slice(0, prevState.length - 1), task]);
    setIsInputTitleVisible(false);
  };

  const showModal = (taskName: string) => {
    setTaskName(taskName);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changeTaskName = () => {
    setTaskName(taskName);
    setIsInputTitleVisible(true);
    setIsModalVisible(false);
  };

  const changeModalTaskName = () => {
    setTaskName(taskName);
  };

  return (
    <>
      <Draggable key={taskProp.id} draggableId={taskProp.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card
              type="inner"
              style={{ marginBottom: 16 }}
              hoverable
            >
              <div>
                <div className="board-column__title" style={{ display: isInputTitleVisible ? 'flex' : 'none' }}>
                  <div>
                    <SimpleInput onChange={(value) => setTaskName(value)} placeholder="Добавить название" />
                  </div>
                  <Button icon={<CheckOutlined />} onClick={handleCreateTask} />
                </div>
                <div
                  role="button"
                  onKeyUp={(e) => console.log(e)}
                  onClick={() => showModal(taskName)}
                  style={{ display: isInputTitleVisible ? 'none' : 'flex', outline: 'none' }}
                  tabIndex={0}
                >
                  {taskName}
                  <Button icon={<EditOutlined className="icon-edit" style={{ width: '12px', height: '12px' }} />} onClick={changeTaskName} ghost style={{ marginLeft: 'auto' }} />
                </div>
              </div>
            </Card>
          </div>
        )}
      </Draggable>
      <Modal
        title={(
          <>
            <div>
              <ProjectOutlined className="icon-task-title" />
              <h4 title={taskName} contentEditable="true">{taskName}</h4>
            </div>
          </>
    )}
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" onClick={changeModalTaskName}>
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

export default Task;
