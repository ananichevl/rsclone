import React, { useEffect, useState } from 'react';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import Column, { ColumnModel } from '../../components/column/Column';
import './board.scss';
import { IState } from '../../store/rootReducer';
import { getBoard } from '../../service/Service';
import { TaskModel } from '../../components/task/Task';

interface IBoardProps {
  id: string;
}

interface MoveResult {
  source: TaskModel[]
  destination: TaskModel[]
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

  const reorder = (startIndex: number, endIndex: number, task?: TaskModel[]) => {
    const result: TaskModel[] = task ? Array.from(task) : [];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (
    source: DraggableLocation,
    destination: DraggableLocation,
    sourceTasks?: TaskModel[],
    destinationTasks?: TaskModel[],
  ) => {
    const sourceClone: TaskModel[] = sourceTasks ? Array.from(sourceTasks) : [];
    const destClone: TaskModel[] = destinationTasks ? Array.from(destinationTasks) : [];
    const [removed] = sourceClone.splice(source.index, 1);

    destClone.splice(destination.index, 0, removed);

    const result: MoveResult = {
      source: sourceClone,
      destination: destClone,
    };

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sInd = columns.findIndex((c) => c.id === source.droppableId);
    const dInd = columns.findIndex((c) => c.id === destination.droppableId);

    if (sInd === dInd) {
      const items = reorder(source.index, destination.index, columns[sInd].tasks);
      const newState = [...columns];

      newState[sInd].tasks = items;
      setColumns(newState);
    } else {
      const res = move(source, destination, columns[sInd].tasks, columns[dInd].tasks);
      const newState = [...columns];
      newState[sInd].tasks = res.source;
      newState[dInd].tasks = res.destination;

      setColumns(newState);
    }
  };

  const columnCards = columns.map((column) => (
    <Column
      boardId={id}
      columnProp={column}
    />
  ));

  return (
    <>
      <h2 title={boardName} contentEditable="true">{boardName}</h2>
      <div className="boardBody" style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columnCards}
          <Button
            onClick={() => setColumns([...columns, {}])}
            icon={<PlusOutlined />}
          >
            Добавить список
          </Button>
        </DragDropContext>
      </div>
    </>
  );
};

export default Board;
