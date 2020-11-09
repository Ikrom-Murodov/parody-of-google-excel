import { ICellStyles } from '@/core/interface';

export const CHANGE_TEXT_CURRENT_CELL = 'CHANGE_TEXT_CURRENT_CELL';
export const CHANGE_STYLES_CURRENT_CELL = 'CHANGE_STYLES_CURRENT_CELL';
export const CHANGE_CELL_STYLES = 'CHANGE_CELL_STYLES';
export const CHANGE_CELLS_TEXT = 'CHANGE_CELLS_TEXT';
export const CHANGE_TABLE_NAME = 'CHANGE_TABLE_NAME';
export const CHANGE_PAGE_ID = 'CHANGE_PAGE_ID';
export const RESIZE_COLUMN = 'RESIZE_COLUMN';
export const UPDATE_DATE = 'UPDATE_DATE';
export const RESIZE_ROW = 'RESIZE_ROW';

export interface ITablePage {
  currentCellText: string;
  currentCellStyles: ICellStyles;
  cellStyles: { [key: string]: ICellStyles };
  cellsText: { id: string; text: string }[];
  columnsState: IColumnState[];
  rowsState: IRowState[];
  tableName: string;
  openedDate: string;
  pageId: string;
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

export interface IActionUpdateDate {
  type: typeof UPDATE_DATE;
}

export interface IActionChangeTableName {
  type: typeof CHANGE_TABLE_NAME;
  data: string;
}

export interface IActionResizeRow {
  type: typeof RESIZE_ROW;
  data: IRowState;
}

export interface IActionResizeColumn {
  type: typeof RESIZE_COLUMN;
  data: IColumnState;
}

export interface IActionChangePageId {
  type: typeof CHANGE_PAGE_ID;
  data: string;
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
  | IActionResizeRow
  | IActionChangeTableName
  | IActionUpdateDate
  | IActionChangePageId;
