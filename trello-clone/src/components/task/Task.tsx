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
import { createTask, updateTask } from '../../service/Service';

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
  description?: string
}

const Task: React.FC<ITaskProps> = ({
  boardId, columnId, taskProp, index, updateColumn,
}) => {
  const [taskName, setTaskName] = useState<string>(taskProp.title || '');
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(!taskProp.title);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(!taskProp.description);

  useEffect(() => {
    setTaskName(taskProp.title || '');
  }, [taskProp.title]);

  useEffect(() => {
    setIsTextAreaVisible(!taskProp.description);
  }, [taskProp.description]);

  const handleCreateTask = async () => {
    const task = await createTask(boardId, columnId, taskName);
    updateColumn((prevState) => [...prevState.slice(0, prevState.length - 1), task]);
    setIsInputTitleVisible(false);
  };

  const updateDescription = async (descriptionValue: string) => {
    const task = await updateTask(boardId, taskName, columnId, taskProp.id, descriptionValue);
    updateColumn((prevState) => {
      const taskIndex = prevState.findIndex((c) => c.id === taskProp.id);
      if (taskIndex === -1) {
        return prevState;
      }
      const newState = [...prevState];
      newState[taskIndex] = task;
      console.log(newState);
      return newState;
    });
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
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      showModal(taskName);
                    }
                  }}
                  style={{ display: isInputTitleVisible ? 'none' : 'flex', outline: 'none' }}
                  tabIndex={0}
                >
                  {taskName}
                  <Button
                    icon={<EditOutlined style={{ width: '12px', height: '12px' }} />}
                    onClick={changeTaskName}
                    ghost
                    style={{ marginLeft: 'auto' }}
                  />
                </div>
              </div>
            </Card>
          </div>
        )}
      </Draggable>
      <Modal
        title={(
          <div style={{ display: 'flex' }}>
            <ProjectOutlined className="icon-task-title" />
            <h4 title={taskName} contentEditable="true">{taskName}</h4>
          </div>
    )}
        visible={isModalVisible}
        afterClose={changeModalTaskName}
        onCancel={() => {
          handleCancel();
        }}
        footer={null}
      >
        <div className="description">
          <AlignLeftOutlined className="icon-description" />
          Описание:
        </div>
        <TextArea
          rows={4}
          style={{ display: isTextAreaVisible ? 'flex' : 'none' }}
          onBlur={(e) => {
            if (e.target.value !== '') {
              setIsTextAreaVisible(false);
              updateDescription(e.target.value);
            }
          }}
        />
        <div
          style={{ display: isTextAreaVisible ? 'none' : 'flex', outline: 'none' }}
          role="button"
          onClick={() => setIsTextAreaVisible(true)}
          onKeyUp={(e) => console.log(e)}
          tabIndex={0}
        >
          {taskProp.description}
        </div>
      </Modal>
    </>
  );
};

export default Task;
