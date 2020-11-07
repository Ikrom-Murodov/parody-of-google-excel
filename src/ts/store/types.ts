export const CHANGE_TEXT_CURRENT_CELL = 'CHANGE_TEXT_CURRENT_CELL';

export interface ITablePage {
  currentCellTExt: string;
}

// Actions
export interface IActionChangeTextCurrentCell {
  type: typeof CHANGE_TEXT_CURRENT_CELL;
  data: string;
}

export type TTablePageActions = IActionChangeTextCurrentCell;