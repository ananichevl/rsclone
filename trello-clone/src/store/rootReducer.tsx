import { SelectBoardAction, SelectBoardActionType } from './actions/selectBoard';
import selectBoardReducer from './reducers/selectBoardReducer';

export interface IState {
  selectedBoardName: string
}

const initialState: IState = {
  selectedBoardName: '',
};

type Actions = SelectBoardAction;

export default function rootReducer(state: IState = initialState, action: Actions): IState {
  switch (action.type) {
    case SelectBoardActionType:
      return selectBoardReducer(state, action);
    default:
      return state;
  }
}
