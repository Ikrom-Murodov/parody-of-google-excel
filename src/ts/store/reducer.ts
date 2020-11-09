/* eslint-disable no-case-declarations */

import { defaultCurrentStylesCell } from '@/core/defaultValue';

import {
  CHANGE_CELL_STYLES,
  CHANGE_CELLS_TEXT,
  CHANGE_PAGE_ID,
  CHANGE_STYLES_CURRENT_CELL,
  CHANGE_TABLE_NAME,
  CHANGE_TEXT_CURRENT_CELL,
  IColumnState,
  IRowState,
  ITablePage,
  RESIZE_COLUMN,
  RESIZE_ROW,
  TTablePageActions,
  UPDATE_DATE,
} from './types';

export const initialState: ITablePage = {
  currentCellText: '',
  cellStyles: {},
  currentCellStyles: defaultCurrentStylesCell,
  cellsText: [],
  columnsState: [],
  rowsState: [],
  tableName: 'New table.',
  openedDate: new Date().toJSON(),
  pageId: 'some-id',
};

export default function rootReducer(
  state = initialState,
  action: TTablePageActions,
): ITablePage {
  switch (action.type) {
    case CHANGE_PAGE_ID:
      return { ...state, pageId: action.data };

    case UPDATE_DATE:
      return { ...state, openedDate: new Date().toJSON() };

    case CHANGE_TABLE_NAME:
      return { ...state, tableName: action.data };

    case CHANGE_TEXT_CURRENT_CELL:
      return { ...state, currentCellText: action.data };

    case CHANGE_STYLES_CURRENT_CELL:
      return { ...state, currentCellStyles: action.data };

    case RESIZE_COLUMN:
    case RESIZE_ROW:
      const type = action.data.type === 'column' ? 'columnsState' : 'rowsState';
      const table = [...state[type]];

      const index = state[type].findIndex(
        (item: IColumnState | IRowState) => item.id === action.data.id,
      );
      if (index > -1) table[index] = action.data;
      else table.push(action.data);

      return { ...state, [type]: table };

    case CHANGE_CELL_STYLES:
      const cellStyles = { ...state.cellStyles };
      action.data.ids.forEach((id) => {
        cellStyles[id] = action.data.styles;
      });
      return { ...state, cellStyles, currentCellStyles: action.data.styles };

    case CHANGE_CELLS_TEXT:
      const cellId = state.cellsText.findIndex(
        ({ id }) => id === action.data.id,
      );
      const cellsText = [...state.cellsText];
      if (cellId > -1) cellsText[cellId] = action.data;
      else cellsText.push(action.data);
      return { ...state, cellsText, currentCellText: action.data.text };

    default:
      return state;
  }
}
