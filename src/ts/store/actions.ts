import { ICellStyles } from '@/core/interface';

import {
  CHANGE_CELL_STYLES,
  CHANGE_CELLS_TEXT,
  CHANGE_STYLES_CURRENT_CELL,
  CHANGE_TABLE_NAME,
  CHANGE_TEXT_CURRENT_CELL,
  RESIZE_COLUMN,
  RESIZE_ROW,
  UPDATE_DATE,
  IActionUpdateDate,
  IActionChangeCellsText,
  IActionChangeCellStyles,
  IActionChangeStylesCurrentCell,
  IActionChangeTableName,
  IActionChangeTextCurrentCell,
  IActionResizeColumn,
  IActionResizeRow,
  IColumnState,
  IRowState,
} from './types';

export function updateDate(): IActionUpdateDate {
  return {
    type: UPDATE_DATE,
  };
}

export function resizeRow(data: IRowState): IActionResizeRow {
  return {
    data,
    type: RESIZE_ROW,
  };
}

export function resizeColumn(data: IColumnState): IActionResizeColumn {
  return {
    data,
    type: RESIZE_COLUMN,
  };
}

export function changeTableName(data: string): IActionChangeTableName {
  return {
    data,
    type: CHANGE_TABLE_NAME,
  };
}

export function changeCellsText(data: {
  id: string;
  text: string;
}): IActionChangeCellsText {
  return {
    data,
    type: CHANGE_CELLS_TEXT,
  };
}

export function changeCellStyles(data: {
  ids: string[];
  styles: ICellStyles;
}): IActionChangeCellStyles {
  return {
    data,
    type: CHANGE_CELL_STYLES,
  };
}

export function changeTextCurrentCell(
  data: string,
): IActionChangeTextCurrentCell {
  return {
    data,
    type: CHANGE_TEXT_CURRENT_CELL,
  };
}

export function changeStylesCurrentCell(
  data: ICellStyles,
): IActionChangeStylesCurrentCell {
  return {
    data,
    type: CHANGE_STYLES_CURRENT_CELL,
  };
}
