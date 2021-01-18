import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import Column, { ColumnModel } from '../../components/column/Column';
import './board.scss';
import { IState } from '../../store/rootReducer';
import { getBoard } from '../../service/Service';

interface IBoardProps {
  id: string;
}

export interface BoardModel {
  id: string
  title: string
  columns: ColumnModel[]
}

const Board: React.FC = () => {
  const [title, setTitle] = useState('');
  const [columns, setColumns] = useState<ColumnModel[]>([]);

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
      columnProp={column}
    />
  ));
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
