import { Action, createAction } from '../index';
import { ColumnModel } from '../../components/column/Column';

export const AddColumnActionType = 'ADD_COLUMN';

export type AddColumnAction = Action<typeof AddColumnActionType, ColumnModel>;

export default function createAddColumnAction(column: ColumnModel): AddColumnAction {
  return createAction(AddColumnActionType, column);
}
