import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Button, Card } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { ItemTypes } from '../ItemTypes/ItemTypes';
import SimpleInput from '../simpleInput/SimpleInput';
import { createTask } from '../../service/Service';

interface ITaskProps {
  onClick: (task: string) => void;
  boardId: string;
  columnId: string;
  index: number;
  move: (any) => void;
}

const Task: React.FC<ITaskProps> = ({
  onClick, boardId, columnId, index, move,
}) => {
  const [taskName, setTaskName] = useState<string>('');
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(true);
  const ref = useRef(null);

  const [, drag] = useDrag({
    item: { type: ItemTypes.TASK },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    drop: () => console.log('drop'),
    accept: ItemTypes.TASK,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const hoverIndex = index;
      console.log(hoverIndex);
      if (hoverIndex === 0 && columnId === item.columnId) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      console.log(hoverClientY > hoverMiddleY);
      console.log(columnId);

      move(ref.current);
    },
  });

  const handleCreateTask = async () => {
    const task = await createTask(boardId, columnId, taskName);
    console.log(task);
    setIsInputTitleVisible(false);
  };
  drag(drop(ref));

  return (
    <div ref={ref}>
      <Card type="inner" style={{ marginBottom: 16 }} hoverable>
        <div>
          <div
            className="board-column__title"
            style={{ display: isInputTitleVisible ? 'flex' : 'none' }}
          >
            <div>
              <SimpleInput
                onChange={(value) => setTaskName(value)}
                placeholder="Добавить название"
              />
            </div>
            <Button icon={<CheckOutlined />} onClick={handleCreateTask} />
          </div>
          <div
            role="button"
            onKeyUp={(e) => console.log(e)}
            onClick={() => onClick(taskName)}
            style={{
              display: isInputTitleVisible ? 'none' : 'flex',
              outline: 'none',
            }}
            tabIndex={0}
          >
            {taskName}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Task;
