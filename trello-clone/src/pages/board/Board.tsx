import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  PlusOutlined, EllipsisOutlined, ExclamationCircleOutlined, CheckOutlined,
} from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Menu, Dropdown, Modal, Spin,
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
  updateBoard,
} from '../../service/Service';
import { TaskModel } from '../../components/task/Task';
import createGetBoardAction from '../../store/actions/getBoard';
import createReorderColumnsAction from '../../store/actions/reorderColumns';
import createReorderTasksAction from '../../store/actions/reorderTasks';
import SimpleInput from '../../components/simpleInput/SimpleInput';
import SideMenu from '../../components/sideMenu/SideMenu';

const { confirm } = Modal;

export interface IBoardProps {
  id: string;
}

interface MoveResult {
  source: TaskModel[];
  destination: TaskModel[];
}

export interface BoardModel {
  id: string;
  title: string;
  background: string;
  columns: ColumnModel[];
}

const Board: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const board = useSelector<IState, IBoard>((state) => state.board);
  const [visible, setVisible] = useState(false);
  const [backgroundBody, setBackgroundBody] = useState('lightblue');
  const [title, setTitle] = useState(board.title);
  const [columns, setColumns] = useState<ColumnModel[]>(board.columns);
  const [isInputTitleVisible, setIsInputTitleVisible] = useState(false);
  const [isLoaderVisible, setLoaderVisible] = useState(true);

  const { id } = useParams<IBoardProps>();

  useEffect(() => {
    const loadBoard = async () => {
      const board = await getBoard(id);
      if (board.status && (board.status === 401 || board.status === 403)) {
        history.push('/login');
      }
      dispatch(createGetBoardAction(board));
      setLoaderVisible(false);
    };

    loadBoard();
  }, []);

  useEffect(() => {
    setTitle(board.title);
    setColumns(board.columns);
    setBackgroundBody(board.background);
  }, [board, board.columns, board.title, board.background]);

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
        if (
          updatedColumn.status && (updatedColumn.status === 401 || updatedColumn.status === 403)
        ) {
          history.push('/login');
        }
        const board = await getBoard(id);
        if (board.status && (board.status === 401 || board.status === 403)) {
          history.push('/login');
        }
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
      if (updatedTask.status && (updatedTask.status === 401 || updatedTask.status === 403)) {
        history.push('/login');
      }
      const board = await getBoard(id);
      if (board.status && (board.status === 401 || board.status === 403)) {
        history.push('/login');
      }
      dispatch(createGetBoardAction(board));
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

  const RemoveBoard = async () => {
    const board = await deleteBoard(id);
    if (board.status && (board.status === 401 || board.status === 403)) {
      history.push('/login');
    }
    history.push('/');
  };

  const { t } = useTranslation();

  const showConfirm = () => {
    confirm({
      style: { borderRadius: '8px' },
      title: t('modal_title_remove_board'),
      icon: <ExclamationCircleOutlined />,
      content: `${t('modal_question_remove_board')} ${title}?`,
      okText: t('modal_remove_btn'),
      cancelText: t('modal_cancel_btn'),
      onOk() {
        RemoveBoard();
      },
    });
  };

  const handleChangeBoardTitle = async () => {
    if (board.id) {
      const board = await updateBoard(id, title);
      if (board.status && (board.status === 401 || board.status === 403)) {
        history.push('/login');
      }
      dispatch(createGetBoardAction(board));
    } else {
      return;
    }
    setIsInputTitleVisible(false);
  };

  const changeBoardName = () => {
    setTitle(title);
    setIsInputTitleVisible(true);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const columnCards = columns.map((column: ColumnModel) => (
    <Column boardId={id} columnProp={column} />
  ));

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={showConfirm}>
        {t('menu_remove_board')}
      </Menu.Item>
      <Menu.Item key="2" onClick={changeBoardName}>
        {t('change_title')}
      </Menu.Item>
      <Menu.Item key="3" onClick={showDrawer}>
        {t('change_background')}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="loader" style={{ display: isLoaderVisible ? 'flex' : 'none' }}>
        <Spin size="large" />
      </div>
      <div
        className="board-wrapper"
        style={{
          display: isLoaderVisible ? 'none' : 'block',
          background: backgroundBody,
        }}
      >
        <div className="board-title">
          <div style={{ display: isInputTitleVisible ? 'flex' : 'none' }}>
            <div>
              <SimpleInput
                onChange={(value) => setTitle(value)}
                placeholder={t('placeholder_add_title')}
                inputValue={title}
                onBlur={(value) => {
                  if (value) {
                    handleChangeBoardTitle();
                  }
                }}
                onPressEnter={(value) => {
                  if (value) {
                    handleChangeBoardTitle();
                  }
                }}
              />
            </div>
            <Button
              icon={<CheckOutlined />}
              onClick={handleChangeBoardTitle}
            />
          </div>
          <div
            className="board__title"
            style={{ display: isInputTitleVisible ? 'none' : 'flex' }}
          >
            {title}
          </div>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button className="menu-btn">
              {t('menu_btn')}
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        </div>
        <div
          className="boardBody"
          style={{ display: 'flex' }}
        >
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
              className="add-column-btn"
              onClick={() => {
                setColumns([...columns, { order: columns.length }]);
              }}
              icon={<PlusOutlined />}
            >
              {t('add_column_btn')}
            </Button>
          </DragDropContext>
          <SideMenu
            visibleProp={visible}
            setNewBgBody={setBackgroundBody}
            closeBgMenu={setVisible}
          />
        </div>
      </div>
    </>
  );
};

export default Board;
