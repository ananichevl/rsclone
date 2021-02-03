import { SelectBoardAction, SelectBoardActionType } from './actions/selectBoard';
import selectBoardReducer from './reducers/selectBoardReducer';
import { ColumnModel } from '../components/column/Column';
import { CreateBoardAction, CreateBoardActionType } from './actions/createBoard';
import createBoardReducer from './reducers/createBoardReducer';
import getBoardReducer from './reducers/getBoardReducer';
import { GetBoardAction, GetBoardActionType } from './actions/getBoard';
import { ReorderColumnsAction, ReorderColumnsActionType } from './actions/reorderColumns';
import reorderColumnsReducer from './reducers/reorderColumnsReducer';
import { ReorderTasksAction, ReorderTasksActionType } from './actions/reorderTasks';
import reorderTasksReducer from './reducers/reorderTasksReducer';
import { AddColumnAction, AddColumnActionType } from './actions/addColumn';
import addColumnReducer from './reducers/addColumnReducer';
import { AddTaskAction, AddTaskActionType } from './actions/addTask';
import addTaskReducer from './reducers/addTaskReducer';

export interface IBoard {
  id: string
  title: string
  background: string
  columns: ColumnModel[]
}

export interface IState {
  board: IBoard
}

const initialState: IState = {
  board: {
    id: '',
    title: '',
    background: '',
    columns: [],
  },
};

type Actions =
  SelectBoardAction
  | CreateBoardAction
  | GetBoardAction
  | ReorderColumnsAction
  | ReorderTasksAction
  | AddColumnAction
  | AddTaskAction;

export default function rootReducer(state: IState = initialState, action: Actions): IState {
  switch (action.type) {
    case SelectBoardActionType:
      return selectBoardReducer(state, action);
    case CreateBoardActionType:
      return createBoardReducer(state, action);
    case GetBoardActionType:
      return getBoardReducer(state, action);
    case ReorderColumnsActionType:
      return reorderColumnsReducer(state, action);
    case ReorderTasksActionType:
      return reorderTasksReducer(state, action);
    case AddColumnActionType:
      return addColumnReducer(state, action);
    case AddTaskActionType:
      return addTaskReducer(state, action);
    default:
      return state;
  }
}
