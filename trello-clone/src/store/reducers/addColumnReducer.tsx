import { IState } from '../rootReducer';
import { AddColumnAction } from '../actions/addColumn';

export default function reduceAddColumnAction(state: IState, action: AddColumnAction): IState {
  return {
    ...state,
    board:
      {
        ...state.board,
        columns: [...state.board.columns, { ...action.payload, tasks: [] }],
      },
  };
}
