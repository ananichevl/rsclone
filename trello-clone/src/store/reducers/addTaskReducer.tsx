import { IState } from '../rootReducer';
import { AddTaskAction } from '../actions/addTask';

export default function reduceAddColumnAction(state: IState, action: AddTaskAction): IState {
  const { columns } = state.board;
  const columnIndex = columns.findIndex((c) => c.id === action.payload.columnId);
  const column = columns[columnIndex];
  column.tasks = column.tasks ? [...column.tasks, action.payload] : [action.payload];
  columns[columnIndex] = column;
  return { ...state, board: { ...state.board, columns } };
}
