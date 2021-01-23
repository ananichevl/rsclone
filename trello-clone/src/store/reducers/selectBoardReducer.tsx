import { IState } from '../rootReducer';
import { SelectBoardAction } from '../actions/selectBoard';

export default function reduceSelectBoardAction(state: IState, action: SelectBoardAction): IState {
  return { ...state, board: { ...state.board, title: action.payload || '' } };
}
