/* eslint-disable no-case-declarations */

import { defaultCurrentStylesCell } from '@/core/defaultValue';

import {
  CHANGE_CELL_STYLES,
  CHANGE_CELLS_TEXT,
  CHANGE_STYLES_CURRENT_CELL,
  CHANGE_TEXT_CURRENT_CELL,
  RESIZE_COLUMN,
  RESIZE_ROW,
  ITablePage,
  TTablePageActions,
} from './types';

export const initialState: ITablePage = {
  currentCellText: '',
  cellStyles: {},
  currentCellStyles: defaultCurrentStylesCell,
  cellsText: [],
  columnsState: [],
  rowsState: [],
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

    case RESIZE_COLUMN:
      const columnsState = { ...state.columnsState };
      const index = state.columnsState.findIndex(
        ({ id }) => id === action.data.id,
      );
      if (index > -1) columnsState[index] = action.data;
      else columnsState.push(action.data);
      return { ...state, columnsState };
      break;

    case RESIZE_ROW:
      const rowsState = { ...state.rowsState };
      const rowIndex = state.rowsState.findIndex(
        ({ id }) => id === action.data.id,
      );
      if (rowIndex > -1) rowsState[rowIndex] = action.data;
      else rowsState.push(action.data);
      return { ...state, rowsState };
      break;

    case CHANGE_CELL_STYLES:
      const cellStyles = { ...state.cellStyles };

      action.data.ids.forEach((id) => {
        cellStyles[id] = action.data.styles;
      });

      return { ...state, cellStyles, currentCellStyles: action.data.styles };
      break;

    case CHANGE_CELLS_TEXT:
      const cellId = state.cellsText.findIndex(
        ({ id }) => id === action.data.id,
      );

      if (cellId > -1) state.cellsText[cellId] = action.data;
      else state.cellsText.push(action.data);

      return { ...state, currentCellText: action.data.text };
      break;

    default:
      return state;
  }
}
