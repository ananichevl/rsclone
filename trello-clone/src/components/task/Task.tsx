import React, {
  useEffect,
  useState,
} from 'react';
import {
  Button, Card, Modal, Input, Dropdown, Menu, Popover,
} from 'antd';
import {
  CheckOutlined, EditOutlined, AlignLeftOutlined,
} from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SimpleInput from '../simpleInput/SimpleInput';
import {
  createTask,
  updateTask,
  deleteTask,
  getBoard,
} from '../../service/Service';
import createAddTaskAction from '../../store/actions/addTask';
import createGetBoardAction from '../../store/actions/getBoard';
import './task.scss';

const { TextArea } = Input;

interface ITaskProps {
  onClick: (task: string) => void
  boardId: string
  columnId: string
  taskProp: TaskModel
}

export interface TaskModel {
  id: string
  order: number
  title: string | ''
  description: string | ''
  columnId?: string
}

const Task: React.FC<ITaskProps> = ({
  boardId, columnId, taskProp,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState<string>((taskProp && taskProp.title) || '');
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(!taskProp.title);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(!taskProp.description);

  useEffect(() => {
    setTaskName(taskProp.title || '');
  }, [taskProp]);

  useEffect(() => {
    setIsTextAreaVisible(!taskProp.description);
  }, [taskProp.description]);

  const handleCreateTask = async () => {
    console.log(taskName);
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
      if (task.status && (task.status === 401 || task.status === 403)) {
        history.push('/login');
      }
      const board = await getBoard(boardId);
      if (board.status && (board.status === 401 || board.status === 403)) {
        history.push('/login');
      }
      dispatch(createGetBoardAction(board));
    } else {
      const task = await createTask(boardId, columnId, taskProp.order, taskName);
      if (task.status && (task.status === 401 || task.status === 403)) {
        history.push('/login');
      }
      dispatch(createAddTaskAction(task));
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
    if (task.status && (task.status === 401 || task.status === 403)) {
      history.push('/login');
    }
    const board = await getBoard(boardId);
    if (board.status && (board.status === 401 || board.status === 403)) {
      history.push('/login');
    }
    dispatch(createGetBoardAction(board));
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
    if (task.status && (task.status === 401 || task.status === 403)) {
      history.push('/login');
    }
    const board = await getBoard(boardId);
    if (board.status && (board.status === 401 || board.status === 403)) {
      history.push('/login');
    }
    dispatch(createGetBoardAction(board));
  };

  const removeTask = async () => {
    const task = await deleteTask(boardId, columnId, taskProp.id);
    if (task.status && (task.status === 401 || task.status === 403)) {
      history.push('/login');
    }
    const board = await getBoard(boardId);
    if (board.status && (board.status === 401 || board.status === 403)) {
      history.push('/login');
    }
    dispatch(createGetBoardAction(board));
  };

  const { t } = useTranslation();

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={removeTask}>{t('task_menu_remove_task')}</Menu.Item>
      <Menu.Item key="2" onClick={changeTaskName}>{t('change_title')}</Menu.Item>
    </Menu>
  );

  return (
    <p>
      <Draggable key={taskProp.id} draggableId={taskProp.id} index={taskProp.order}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Dropdown overlay={menu} trigger={['contextMenu']}>
              <Card
                className="task"
                type="inner"
                style={{ marginBottom: 16 }}
              >
                <div>
                  <div style={{ display: isInputTitleVisible ? 'flex' : 'none' }}>
                    <div>
                      <SimpleInput
                        onChange={(value) => setTaskName(value)}
                        placeholder={t('placeholder_add_title')}
                        onBlur={(value) => {
                          if (value) {
                            setTaskName(value);
                            setIsInputTitleVisible(false);
                          }
                        }}
                        onPressEnter={(value) => {
                          if (value) {
                            setTaskName(value);
                            setIsInputTitleVisible(false);
                          }
                        }}
                        inputValue={taskName}
                      />
                    </div>
                    <Button
                      className="check-btn"
                      type="text"
                      disabled={taskName === ''}
                      icon={<CheckOutlined />}
                      onClick={handleCreateTask}
                    />
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
                      className="edit-task-btn"
                      icon={<EditOutlined style={{ width: '12px', height: '12px' }} />}
                      onClick={changeTaskName}
                      ghost
                    />
                  </div>
                </div>
              </Card>
            </Dropdown>
          </div>
        )}
      </Draggable>
      <Modal
        centered
        title={(
          <div style={{ display: 'flex' }}>
            <div style={{ display: isInputTitleVisible ? 'flex' : 'none' }}>
              <div>
                <SimpleInput
                  onChange={(value) => setTaskName(value)}
                  placeholder={t('placeholder_add_title')}
                  onBlur={(value) => {
                    if (value) {
                      setTaskName(value);
                      setIsInputTitleVisible(false);
                    }
                  }}
                  inputValue={taskName}
                />
              </div>
              <Button
                className="check-btn"
                icon={<CheckOutlined />}
                onClick={handleCreateTask}
              />
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
        <div className="description" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <AlignLeftOutlined className="icon-description" />
            {t('task_description')}
            :
          </div>
          <Popover
            placement="right"
            content={
              <pre>{t('formatting_hint')}</pre>
            }
            trigger="click"
          >
            <Button className="hint-btn">
              {t('formatting_btn')}
            </Button>
          </Popover>
        </div>
        <TextArea
          rows={4}
          className="textarea"
          style={{ display: isTextAreaVisible ? 'flex' : 'none' }}
          onBlur={(e) => {
            if (e.target.value !== '') {
              setIsTextAreaVisible(false);
              updateDescription(e.target.value);
            }
          }}
          defaultValue={taskProp.description}
          autoFocus
        />
        <div
          style={{ display: isTextAreaVisible ? 'none' : 'flex', outline: 'none' }}
          role="button"
          onClick={() => setIsTextAreaVisible(true)}
          onKeyUp={(e) => console.log(e)}
          tabIndex={0}
        >
          <ReactMarkdown source={taskProp.description} className="markdown" />
        </div>
      </Modal>
    </p>
  );
};

export default Task;
