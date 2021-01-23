import { Action, createAction } from '../index';
import { ColumnModel } from '../../components/column/Column';

export const ReorderTasksActionType = 'REORDER_TASKS';

export type ReorderTasksAction = Action<typeof ReorderTasksActionType, ColumnModel[]>;

export default function createReorderTasksAction(columns: ColumnModel[]): ReorderTasksAction {
  return createAction(ReorderTasksActionType, columns);
}
