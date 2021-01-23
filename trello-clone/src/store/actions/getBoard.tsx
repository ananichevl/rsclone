import { Action, createAction } from '../index';
import { IBoard } from '../rootReducer';

export const GetBoardActionType = 'GET_BOARD';

export type GetBoardAction = Action<typeof GetBoardActionType, IBoard>;

export default function createGetBoardAction(board: IBoard): GetBoardAction {
  return createAction(GetBoardActionType, board);
}
