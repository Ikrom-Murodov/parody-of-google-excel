import { CHANGE_TEXT_CURRENT_CELL, ITable, TTableActions } from './types';

const initialState: ITable = {
  currentCellTExt: '',
};

export default function tableReducer(
  state = initialState,
  action: TTableActions,
): ITable {
  switch (action.type) {
    case CHANGE_TEXT_CURRENT_CELL:
      return { ...state, currentCellTExt: action.data };
      break;

    default:
      return state;
  }
}
