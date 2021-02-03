import { IState } from '../rootReducer';
import { GetBoardAction } from '../actions/getBoard';

export default function reduceGetBoardAction(state: IState, action: GetBoardAction): IState {
  return { ...state, board: { ...state.board, ...action.payload } };
}
