import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import SimpleInput from '../simpleInput/SimpleInput';
import { createTask } from '../../service/Service';

interface ITaskProps {
  onClick: (task: string) => void
  boardId: string
  columnId: string
}

const Task: React.FC<ITaskProps> = ({ onClick, boardId, columnId }) => {
  const [taskName, setTaskName] = useState<string>('');
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(true);

  const handleCreateTask = async () => {
    const task = await createTask(boardId, columnId, taskName);
    console.log(task);
    setIsInputTitleVisible(false);
  };

  return (
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
  );
};

export default Task;
