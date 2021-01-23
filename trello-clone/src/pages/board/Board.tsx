import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { PlusOutlined, EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Menu, Dropdown, Modal,
} from 'antd';
import { useTranslation } from 'react-i18next';
import Column, { ColumnModel } from '../../components/column/Column';
import './board.scss';
import { IBoard, IState } from '../../store/rootReducer';
import {
  getBoard,
  updateColumn,
  updateTask,
  deleteBoard,
} from '../../service/Service';
import { TaskModel } from '../../components/task/Task';
import createGetBoardAction from '../../store/actions/getBoard';
import createReorderColumnsAction from '../../store/actions/reorderColumns';
import createReorderTasksAction from '../../store/actions/reorderTasks';

const { confirm } = Modal;

interface IBoardProps {
  id: string;
}

interface MoveResult {
  source: TaskModel[];
  destination: TaskModel[];
}

export interface BoardModel {
  id: string;
  title: string;
  columns: ColumnModel[];
}

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const board = useSelector<IState, IBoard>((state) => state.board);

  const [title, setTitle] = useState(board.title);
  const [columns, setColumns] = useState<ColumnModel[]>(board.columns);

  const { id } = useParams<IBoardProps>();

  useEffect(() => {
    const loadBoard = async () => {
      const board = await getBoard(id);
      dispatch(createGetBoardAction(board));
    };

    loadBoard();
  }, []);

  useEffect(() => {
    setTitle(board.title);
    setColumns(board.columns);
  }, [board]);

  const reorder = (
    startIndex: number,
    endIndex: number,
    tasks?: TaskModel[],
  ) => {
    const result: TaskModel[] = tasks ? Array.from(tasks) : [];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const reorderColumns = (
    startIndex: number,
    endIndex: number,
    columns?: ColumnModel[],
  ) => {
    const result: ColumnModel[] = columns ? Array.from(columns) : [];
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
    const destClone: TaskModel[] = destinationTasks
      ? Array.from(destinationTasks)
      : [];
    const [removed] = sourceClone.splice(source.index, 1);

    destClone.splice(destination.index, 0, removed);

    const result: MoveResult = {
      source: sourceClone,
      destination: destClone,
    };

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const {
      source, destination, type, draggableId,
    } = result;

    if (!destination) {
      return;
    }

    if (type === 'column') {
      dispatch(
        createReorderColumnsAction(reorderColumns(source.index, destination.index, columns)),
      );
      const updateColumnFunc = async () => {
        const updatedColumn = await updateColumn(
          id,
          draggableId,
          destination.index,
        );
        console.log(updatedColumn);

        const board = await getBoard(id);
        setColumns(board.columns);
      };

      updateColumnFunc();
      return;
    }

    const sInd = columns.findIndex((c) => c.id === source.droppableId);
    const dInd = columns.findIndex((c) => c.id === destination.droppableId);

    const updateTaskFunc = async () => {
      const updatedTask = await updateTask(
        id,
        source.droppableId,
        draggableId,
        destination.index,
        destination.droppableId === source.droppableId
          ? undefined
          : destination.droppableId,
      );
      console.log(updatedTask);

      const board = await getBoard(id);
      dispatch(createGetBoardAction(board.columns));
    };

    updateTaskFunc();

    if (sInd === dInd) {
      const items = reorder(
        source.index,
        destination.index,
        columns[sInd].tasks,
      );
      const newState = [...columns];

      newState[sInd].tasks = items;
      dispatch(createReorderTasksAction(newState));
    } else {
      const res = move(
        source,
        destination,
        columns[sInd].tasks,
        columns[dInd].tasks,
      );
      const newState = [...columns];
      newState[sInd].tasks = res.source;
      newState[dInd].tasks = res.destination;

      dispatch(createReorderTasksAction(newState));
    }
  };

  const history = useHistory();

  const RemoveBoard = async () => {
    await deleteBoard(id);
    history.push('/');
  };

  const { t } = useTranslation();

  const showConfirm = () => {
    confirm({
      title: t('modal_title_remove_board'),
      icon: <ExclamationCircleOutlined />,
      content: `${t('modal_question_remove_board')} ${boardName}?`,
      okText: t('modal_remove_btn'),
      cancelText: t('modal_cancel_btn'),
      onOk() {
        RemoveBoard();
      },
    });
  };

  const changeBoardName = () => {
    // RENAME BOARD
  };

  const columnCards = columns.map((column) => (
    <Column boardId={id} columnProp={column} updateBoard={setColumns} />
  ));

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={showConfirm}>
        {t('menu_remove_board')}
      </Menu.Item>
      <Menu.Item key="2" onClick={changeBoardName}>
        {t('change_title')}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="board-title">
        <h2 title={title}>
          {title}
        </h2>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button>
            {t('menu_btn')}
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="boardBody" style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            key={id}
            droppableId={id}
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                style={{ display: 'flex' }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columnCards}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Button
            onClick={() => {
              setColumns([...columns, { order: columns.length }]);
            }}
            icon={<PlusOutlined />}
            style={{ marginRight: '3rem' }}
          >
            {t('add_column_btn')}
          </Button>
        </DragDropContext>
      </div>
    </>
  );
};

export default Board;
