import { Action, createAction } from '../index';
import { ColumnModel } from '../../components/column/Column';

export const ReorderColumnsActionType = 'REORDER_COLUMNS';

export type ReorderColumnsAction = Action<typeof ReorderColumnsActionType, ColumnModel[]>;

export default function createReorderColumnsAction(columns: ColumnModel[]): ReorderColumnsAction {
  return createAction(ReorderColumnsActionType, columns);
}
