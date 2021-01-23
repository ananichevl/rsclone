import { IState } from '../rootReducer';
import { CreateBoardAction } from '../actions/createBoard';

export default function reduceSelectBoardAction(state: IState, action: CreateBoardAction): IState {
  return { ...state, board: { ...state.board, ...action.payload } };
}
