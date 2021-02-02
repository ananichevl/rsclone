import React, {
  useState, useEffect,
} from 'react';
import {
  Card, Button, Dropdown, Menu,
} from 'antd';
import { PlusOutlined, CheckOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SimpleInput from '../simpleInput/SimpleInput';
import Task, { TaskModel } from '../task/Task';
import './column.scss';
import {
  addColumn, updateColumn, deleteColumn, getBoard,
} from '../../service/Service';
import createAddColumnAction from '../../store/actions/addColumn';
import createGetBoardAction from '../../store/actions/getBoard';

interface IColumnProps {
  boardId: string
  columnProp: ColumnModel
}

export interface ColumnModel {
  order: number
  id?: string
  title?: string
  tasks?: TaskModel[]
}

const Column: React.FC<IColumnProps> = ({
  boardId,
  columnProp,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [columnId, setColumnId] = useState(columnProp.id || '');
  const [columnName, setColumnName] = useState<string>(columnProp.title || '');
  const [tasks, setTasks] = useState<TaskModel[]>(columnProp.tasks || []);
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(!columnProp.title);

  useEffect(() => {
    setColumnName(columnProp?.title || '');
    setColumnId(columnProp?.id || '');
    setTasks(columnProp?.tasks || []);
  }, [columnProp.tasks, columnProp.title, columnProp.id]);

  const handleCheck = async () => {
    if (columnProp.id) {
      const column = await updateColumn(boardId, columnId, undefined, columnName);
      if (column.status && (column.status === 401 || column.status === 403)) {
        history.push('/login');
      }
      const board = await getBoard(boardId);
      if (board.status && (board.status === 401 || board.status === 403)) {
        history.push('/login');
      }
      dispatch(createGetBoardAction(board));
    } else {
      const column = await addColumn(boardId, columnName, columnProp.order);
      if (column.status && (column.status === 401 || column.status === 403)) {
        history.push('/login');
      }
      dispatch(createAddColumnAction(column));
    }
    setIsInputTitleVisible(false);
  };

  const removeColumn = async () => {
    const column = await deleteColumn(boardId, columnProp.id, columnProp.title);
    if (column.status && (column.status === 401 || column.status === 403)) {
      history.push('/login');
    }
    const board = await getBoard(boardId);
    if (board.status && (board.status === 401 || board.status === 403)) {
      history.push('/login');
    }
    dispatch(createGetBoardAction(board));
  };

  const changeColumnName = async () => {
    setColumnName(columnName);
    setIsInputTitleVisible(true);
  };

  const { t } = useTranslation();

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={removeColumn}>{t('column_menu_remove_column')}</Menu.Item>
      <Menu.Item key="2" onClick={changeColumnName}>{t('change_title')}</Menu.Item>
    </Menu>
  );

  const taskCards = tasks.map((task: TaskModel) => (
    <Task
      boardId={boardId}
      columnId={columnId}
      taskProp={task}
      onClick={() => console.log('click')}
    />
  ));

  return (
    <>
      <Draggable key={columnId} draggableId={columnId} index={columnProp.order}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Card
              style={{ marginRight: 16 }}
              className="board-column"
              title={(
                <div {...provided.dragHandleProps}>
                  <div className="board-column__input-title" style={{ display: isInputTitleVisible ? 'flex' : 'none' }}>
                    <div>
                      <SimpleInput
                        onChange={(value) => setColumnName(value)}
                        placeholder={t('placeholder_add_title')}
                        inputValue={columnName}
                        onBlur={(value) => console.log(value)}
                        onPressEnter={(value) => {
                          if (value) {
                            setColumnName(value);
                            handleCheck();
                          }
                        }}
                      />
                    </div>
                    <Button
                      className="check-btn"
                      type="text"
                      disabled={columnName === ''}
                      icon={<CheckOutlined />}
                      onClick={handleCheck}
                    />
                  </div>
                  <div
                    className="board-column__title"
                    style={{ display: isInputTitleVisible ? 'none' : 'flex' }}
                  >
                    {columnName}
                    <Dropdown overlay={menu} trigger={['click']}>
                      <EllipsisOutlined className="options-btn" key="ellipsis" />
                    </Dropdown>
                  </div>
                </div>
              )}
              bordered={false}
            >
              <Droppable key={columnId} droppableId={columnId} type="tasks">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="column-body"
                  >
                    {taskCards}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Button
                disabled={tasks.findIndex((task) => task.id === '123') !== -1}
                className="add-task-btn"
                onClick={() => setTasks([...tasks, { id: '123', order: tasks.length }])}
                icon={<PlusOutlined />}
              >
                {t('add_task_btn')}
              </Button>
            </Card>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Column;
