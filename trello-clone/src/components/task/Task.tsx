import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import SimpleInput from '../simpleInput/SimpleInput';

interface ITaskProps {
  onClick: () => void
}

const Task: React.FC<ITaskProps> = ({ onClick }) => {
  const [taskName, setTaskName] = useState<string>('');
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(true);
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
          <Button icon={<CheckOutlined />} onClick={() => setIsInputTitleVisible(false)} />
        </div>
        <div
          role="button"
          onKeyUp={(e) => console.log(e)}
          onClick={onClick}
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
