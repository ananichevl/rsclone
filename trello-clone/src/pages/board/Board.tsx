import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import SimpleButton from '../../components/SimpleButton';
// import InputCard from '../../components/InputCard';
import Column from '../../components/column/Column';
import BoardHeader from '../../components/BoardHeader';
import './board.scss';

const Board: React.FC = () => {
  const [counter, setCounter] = useState(0);

  const columns = new Array(counter).fill(<Column />);

  return (
    <>
      <BoardHeader />
      <div className="boardBody">
        {columns}
        <SimpleButton action={() => setCounter(counter + 1)} title="Добавить список" icon={<PlusOutlined />} />
      </div>
    </>
  );
};

export default Board;
