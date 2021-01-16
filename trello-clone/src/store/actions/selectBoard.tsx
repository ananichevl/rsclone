import { Action, createAction } from '../index';

export const SelectBoardActionType = 'SELECT_BOARD';

export type SelectBoardAction = Action<typeof SelectBoardActionType, string>;

export default function createSelectBoardAction(value: string): SelectBoardAction {
  return createAction(SelectBoardActionType, value);
}
