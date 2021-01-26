import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  Button, Card, Modal, Input, Dropdown, Menu,
} from 'antd';
import {
  CheckOutlined, EditOutlined, AlignLeftOutlined, ProjectOutlined,
} from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import SimpleInput from '../simpleInput/SimpleInput';
import {
  createTask,
  updateTask,
  deleteTask,
  getColumn,
} from '../../service/Service';

const { TextArea } = Input;

interface ITaskProps {
  onClick: (task: string) => void
  boardId: string
  columnId: string
  taskProp: TaskModel
  updateColumn: Dispatch<SetStateAction<TaskModel[]>>
}

export interface TaskModel {
  id: string
  order: number
  title?: string
  description?: string
}

const Task: React.FC<ITaskProps> = ({
  boardId, columnId, taskProp, updateColumn,
}) => {
  const [taskName, setTaskName] = useState<string>((taskProp && taskProp.title) || '');
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
    if (taskProp.id !== '123') {
      const task = await updateTask(
        boardId,
        columnId,
        taskProp.id,
        undefined,
        undefined,
        taskName,
        undefined,
      );
      updateColumn((prevState) => {
        const taskIndex = prevState.findIndex((c) => c.id === taskProp.id);
        if (taskIndex === -1) {
          return prevState;
        }
        const newState = [...prevState];
        newState[taskIndex] = task;
        return newState;
      });
    } else {
      const task = await createTask(boardId, columnId, taskProp.order, taskName);
      updateColumn((prevState) => [...prevState.slice(0, prevState.length - 1), task]);
    }

    setIsInputTitleVisible(false);
  };

  const updateDescription = async (descriptionValue: string) => {
    const task = await updateTask(
      boardId,
      columnId,
      taskProp.id,
      undefined,
      undefined,
      undefined,
      descriptionValue,
    );
    updateColumn((prevState) => {
      const taskIndex = prevState.findIndex((c) => c.id === taskProp.id);
      if (taskIndex === -1) {
        return prevState;
      }
      const newState = [...prevState];
      newState[taskIndex] = task;
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
  };

  const changeModalTaskName = async () => {
    const task = await updateTask(
      boardId,
      columnId,
      taskProp.id,
      undefined,
      undefined,
      taskName,
      undefined,
    );
    updateColumn((prevState) => {
      const taskIndex = prevState.findIndex((c) => c.id === taskProp.id);
      if (taskIndex === -1) {
        return prevState;
      }
      const newState = [...prevState];
      newState[taskIndex] = task;
      return newState;
    });
  };

  const removeTask = async () => {
    await deleteTask(boardId, columnId, taskProp.id);
    const column = await getColumn(boardId, columnId);
    updateColumn(column.tasks);
  };

  const { t } = useTranslation();

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={removeTask}>{t('task_menu_remove_task')}</Menu.Item>
      <Menu.Item key="2" onClick={changeTaskName}>{t('change_title')}</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Draggable key={taskProp.id} draggableId={taskProp.id} index={taskProp.order}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Dropdown overlay={menu} trigger={['contextMenu']}>
              <Card
                type="inner"
                style={{ marginBottom: 16 }}
                hoverable
              >
                <div>
                  <div className="board-column__title" style={{ display: isInputTitleVisible ? 'flex' : 'none' }}>
                    <div>
                      <SimpleInput
                        onChange={(value) => setTaskName(value)}
                        placeholder={t('placeholder_add_title')}
                        onBlur={(value) => {
                          setTaskName(value);
                          if (value) {
                            setIsInputTitleVisible(false);
                          }
                        }}
                        inputValue={taskName}
                      />
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
            </Dropdown>
          </div>
        )}
      </Draggable>
      <Modal
        title={(
          <div style={{ display: 'flex' }}>
            <ProjectOutlined className="icon-task-title" />
            <div style={{ display: isInputTitleVisible ? 'flex' : 'none' }}>
              <div>
                <SimpleInput
                  onChange={(value) => setTaskName(value)}
                  placeholder={t('placeholder_add_title')}
                  onBlur={(value) => {
                    setTaskName(value);
                    if (value) {
                      setIsInputTitleVisible(false);
                    }
                  }}
                  inputValue={taskName}
                />
              </div>
              <Button icon={<CheckOutlined />} onClick={handleCreateTask} />
            </div>
            <div
              style={{ display: isInputTitleVisible ? 'none' : 'flex', outline: 'none' }}
              role="button"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsInputTitleVisible(true);
                }
              }}
              onKeyUp={(e) => console.log(e)}
              tabIndex={0}
            >
              {taskName}
            </div>
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
