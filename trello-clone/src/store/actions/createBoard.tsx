import { Action, createAction } from '../index';
import { IBoard } from '../rootReducer';

export const CreateBoardActionType = 'CREATE_BOARD';

export type CreateBoardAction = Action<typeof CreateBoardActionType, IBoard>;

export default function createCreateBoardAction(board: IBoard): CreateBoardAction {
  return createAction(CreateBoardActionType, board);
}
