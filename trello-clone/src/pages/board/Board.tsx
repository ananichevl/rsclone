import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import InputCard from '../../components/InputCard';
import SimpleButton from '../../components/SimpleButton';
import Column from '../../components/column/Column';
// import BoardHeader from '../../components/BoardHeader';
import './board.scss';
import { IState } from '../../store/rootReducer';

interface IBoardProps {
  id: string;
}

const Board: React.FC = () => {
  const [counter, setCounter] = useState(0);

  const { id } = useParams<IBoardProps>();
  console.log(id);
  const boardName = useSelector<IState, string>((state) => state.selectedBoardName);

  const columns = new Array(counter).fill(<Column />);

  return (
    <>
      <h2 title={boardName} contentEditable="true">{boardName}</h2>
      <div className="boardBody">
        {columns}
        <SimpleButton action={() => setCounter(counter + 1)} title="Добавить список" icon={<PlusOutlined />} />
      </div>
    </>
  );
};

export default Board;
