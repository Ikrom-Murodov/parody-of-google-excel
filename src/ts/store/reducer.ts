/* eslint-disable no-case-declarations */

import { defaultCurrentStylesCell } from '@/core/defaultValue';

import {
  CHANGE_TEXT_CURRENT_CELL,
  CHANGE_STYLES_CURRENT_CELL,
  CHANGE_CELL_STYLES,
  CHANGE_CELL_TEXTS,
  ITablePage,
  TTablePageActions,
} from './types';

export const initialState: ITablePage = {
  currentCellText: '',
  cellStyles: {},
  currentCellStyles: defaultCurrentStylesCell,
  cellText: [],
};

export default function rootReducer(
  state = initialState,
  action: TTablePageActions,
): ITablePage {
  switch (action.type) {
    case CHANGE_TEXT_CURRENT_CELL:
      return { ...state, currentCellText: action.data };
      break;

    case CHANGE_STYLES_CURRENT_CELL:
      return { ...state, currentCellStyles: action.data };
      break;

    case CHANGE_CELL_STYLES:
      const cellStyles = { ...state.cellStyles };

      action.data.ids.forEach((id) => {
        cellStyles[id] = action.data.styles;
      });

      return { ...state, cellStyles, currentCellStyles: action.data.styles };
      break;

    case CHANGE_CELL_TEXTS:
      const cellId = state.cellText.findIndex(
        ({ id }) => id === action.data.id,
      );

      if (cellId > -1) state.cellText[cellId] = action.data;
      else state.cellText.push(action.data);

      return { ...state, currentCellText: action.data.text };
      break;

    default:
      return state;
  }
}
