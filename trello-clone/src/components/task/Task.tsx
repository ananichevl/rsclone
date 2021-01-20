import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Button, Card } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';
import SimpleInput from '../simpleInput/SimpleInput';
import { createTask } from '../../service/Service';

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
  onClick, boardId, columnId, taskProp, index, updateColumn,
}) => {
  const [taskName, setTaskName] = useState<string>(taskProp.title || '');
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(!taskProp.title);
  useEffect(() => {
    setTaskName(taskProp.title || '');
  }, [taskProp.title]);

  useEffect(() => {
    setTaskName(taskProp.title || '');
  }, [taskProp.title]);

  const handleCreateTask = async () => {
    const task = await createTask(boardId, columnId, taskName);
    updateColumn((prevState) => [...prevState.slice(0, prevState.length - 1), task]);
    setIsInputTitleVisible(false);
  };

  return (
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
                onClick={() => onClick(taskName)}
                style={{ display: isInputTitleVisible ? 'none' : 'flex', outline: 'none' }}
                tabIndex={0}
              >
                {taskName}
              </div>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
