import { IState } from '../rootReducer';
import { ReorderColumnsAction } from '../actions/reorderColumns';

export default function reduceReorderColumnsAction(
  state: IState, action: ReorderColumnsAction,
): IState {
  return { ...state, board: { ...state.board, columns: action.payload || state.board.columns } };
}
