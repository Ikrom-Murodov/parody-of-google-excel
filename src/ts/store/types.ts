import { ICellStyles } from '@/core/interface';

export const CHANGE_TEXT_CURRENT_CELL = 'CHANGE_TEXT_CURRENT_CELL';
export const CHANGE_STYLES_CURRENT_CELL = 'CHANGE_STYLES_CURRENT_CELL';
export const CHANGE_CELL_STYLES = 'CHANGE_CELL_STYLES';
export const CHANGE_CELLS_TEXT = 'CHANGE_CELLS_TEXT';
export const RESIZE_COLUMN = 'RESIZE_COLUMN';
export const RESIZE_ROW = 'RESIZE_ROW';

export interface ITablePage {
  currentCellText: string;
  currentCellStyles: ICellStyles;
  cellStyles: { [key: string]: ICellStyles };
  cellsText: { id: string; text: string }[];
  columnsState: IColumnState[];
  rowsState: IRowState[];
}

export interface IColumnState {
  width: number;
  id: number;
}

export interface IRowState {
  height: number;
  id: number;
}

// Actions

export interface IActionResizeRow {
  type: typeof RESIZE_ROW;
  data: IRowState;
}

export interface IActionResizeColumn {
  type: typeof RESIZE_COLUMN;
  data: IColumnState;
}

export interface IActionChangeTextCurrentCell {
  type: typeof CHANGE_TEXT_CURRENT_CELL;
  data: string;
}

export interface IActionChangeStylesCurrentCell {
  type: typeof CHANGE_STYLES_CURRENT_CELL;
  data: ICellStyles;
}

export interface IActionChangeCellStyles {
  type: typeof CHANGE_CELL_STYLES;
  data: { ids: string[]; styles: ICellStyles };
}

export interface IActionChangeCellsText {
  type: typeof CHANGE_CELLS_TEXT;
  data: { id: string; text: string };
}

// Actions //

export type TTablePageActions =
  | IActionChangeTextCurrentCell
  | IActionChangeStylesCurrentCell
  | IActionChangeCellStyles
  | IActionChangeCellsText
  | IActionResizeColumn
  | IActionResizeRow;
