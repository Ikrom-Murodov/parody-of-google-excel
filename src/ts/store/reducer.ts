import {
  CHANGE_TEXT_CURRENT_CELL,
  ITablePage,
  TTablePageActions,
} from './types';

const initialState: ITablePage = {
  currentCellTExt: '',
};

export default function rootReducer(
  state = initialState,
  action: TTablePageActions,
): ITablePage {
  switch (action.type) {
    case CHANGE_TEXT_CURRENT_CELL:
      return { ...state, currentCellTExt: action.data };
      break;

    default:
      return state;
  }
}
