import React, {
  useState, useEffect, Dispatch, SetStateAction,
} from 'react';
import { Card, Button } from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import SimpleInput from '../simpleInput/SimpleInput';
import Task, { TaskModel } from '../task/Task';
import './column.scss';
import { addColumn } from '../../service/Service';

interface IColumnProps {
  boardId: string
  columnProp: ColumnModel
  index: number
  updateBoard: Dispatch<SetStateAction<ColumnModel[]>>
}

export interface ColumnModel {
  id?: string
  title?: string
  tasks?: TaskModel[]
}

const Column: React.FC<IColumnProps> = ({
  boardId,
  columnProp,
  index,
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
    const column = await addColumn(boardId, columnName);
    column.title = columnName;
    updateBoard((prevState) => [...prevState.slice(0, prevState.length - 1), column]);
    setColumnId(column.id);
    setIsInputTitleVisible(false);
  };

  const taskCards = tasks.map((task, index) => (
    <Task
      boardId={boardId}
      columnId={columnId}
      taskProp={task}
      index={index}
      updateColumn={setTasks}
    />
  ));
  return (
    <>
      <Draggable key={columnId} draggableId={columnId} index={index}>
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
                onClick={() => setTasks([...tasks, { id: '123' }])}
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
