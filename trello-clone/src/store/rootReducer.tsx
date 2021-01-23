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

export interface IBoard {
  id: string
  title: string
  columns: ColumnModel[]
}

export interface IState {
  board: IBoard
}

const initialState: IState = {
  board: {
    id: '',
    title: '',
    columns: [],
  },
};

type Actions =
  SelectBoardAction
  | CreateBoardAction
  | GetBoardAction
  | ReorderColumnsAction
  | ReorderTasksAction;

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
    default:
      return state;
  }
}
