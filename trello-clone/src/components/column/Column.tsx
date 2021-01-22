import React, {
  useState, useEffect, Dispatch, SetStateAction,
} from 'react';
import {
  Card, Button, Dropdown, Menu,
} from 'antd';
import { PlusOutlined, CheckOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import SimpleInput from '../simpleInput/SimpleInput';
import Task, { TaskModel } from '../task/Task';
import './column.scss';
import { addColumn, deleteColumn, getBoard } from '../../service/Service';

interface IColumnProps {
  boardId: string
  columnProp: ColumnModel
  updateBoard: Dispatch<SetStateAction<ColumnModel[]>>
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
  updateBoard,
}) => {
  const [columnId, setColumnId] = useState(columnProp.id || '');
  const [columnName, setColumnName] = useState<string>(columnProp.title || '');
  const [tasks, setTasks] = useState<TaskModel[]>(columnProp.tasks || []);
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(!columnProp.title);

  useEffect(() => {
    setTasks(columnProp.tasks || []);
  }, [columnProp.tasks]);

  useEffect(() => {
    setColumnName(columnProp.title || '');
  }, [columnProp.title]);

  useEffect(() => {
    setColumnId(columnProp.id || '');
  }, [columnProp.id]);

  useEffect(() => {
    updateBoard((prevState) => {
      const colIndex = prevState.findIndex((c) => c.id === columnId);
      if (colIndex === -1) {
        return prevState;
      }
      const newState = [...prevState];
      newState[colIndex].tasks = tasks;
      return newState;
    });
  }, [tasks]);

  const handleCheck = async () => {
    const column = await addColumn(boardId, columnName, columnProp.order);
    column.title = columnName;
    updateBoard((prevState) => [...prevState.slice(0, prevState.length - 1), column]);
    setColumnId(column.id);
    setIsInputTitleVisible(false);
  };

  console.log(tasks);
  const removeColumn = async () => {
    await deleteColumn(boardId, columnProp.id, columnProp.title);
    const board = await getBoard(boardId);

    updateBoard(board.columns);
  };

  const changeColumnName = () => {
    // RENAME COLUMN
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={removeColumn}>Удалить колонку</Menu.Item>
      <Menu.Item key="2" onClick={changeColumnName}>Переименовать</Menu.Item>
    </Menu>
  );

  const taskCards = tasks.map((task) => (
    <Task
      boardId={boardId}
      columnId={columnId}
      taskProp={task}
      updateColumn={setTasks}
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
                      <SimpleInput onChange={(value) => setColumnName(value)} placeholder="Добавить название" />
                    </div>
                    <Button
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
                  >
                    {taskCards}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Button
                onClick={() => setTasks([...tasks, { id: '123', order: tasks.length }])}
                icon={<PlusOutlined />}
                style={{ width: '100%', textAlign: 'left' }}
              >
                Добавить задачу
              </Button>
            </Card>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Column;
