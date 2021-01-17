import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import Column from '../../components/column/Column';
import './board.scss';
import { IState } from '../../store/rootReducer';
import { getBoard } from '../../service/Service';

interface IBoardProps {
  id: string;
}

const Board: React.FC = () => {
  const [title, setTitle] = useState('');
  const [columns, setColumns] = useState([]);

  const { id } = useParams<IBoardProps>();
  useEffect(() => {
    (async function loadBoard() {
      const board = await getBoard(id);
      setTitle(board.title);
      setColumns(board.columns);
    }());
  }, []);

  const boardName = useSelector<IState, string>((state) => state.selectedBoardName) || title;

  const columnCards = columns.map((column) => (
    <Column
      boardId={id}
      columnTitle={column.title}
      propColumnId={column.id}
    />
  ));
  // const columns = new Array(counter).fill(<Column boardId={id} />);
  return (
    <>
      <h2 title={boardName} contentEditable="true">{boardName}</h2>
      <div className="boardBody">
        {columnCards}
        <Button
          onClick={() => setColumns([...columns, {}])}
          icon={<PlusOutlined />}
        >
          Добавить список
        </Button>
      </div>
    </>
  );
};

export default Board;
