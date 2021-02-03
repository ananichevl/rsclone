import { Action, createAction } from '../index';
import { TaskModel } from '../../components/task/Task';

export const AddTaskActionType = 'ADD_TASK';

export type AddTaskAction = Action<typeof AddTaskActionType, TaskModel>;

export default function createAddTaskAction(task: TaskModel): AddTaskAction {
  return createAction(AddTaskActionType, task);
}
