import { IState } from '../rootReducer';
import { ReorderTasksAction } from '../actions/reorderTasks';

export default function reduceReorderTasksAction(
  state: IState, action: ReorderTasksAction,
): IState {
  return { ...state, board: { ...state.board, columns: action.payload || state.board.columns } };
}
