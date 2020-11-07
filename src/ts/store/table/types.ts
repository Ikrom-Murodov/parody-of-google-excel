export const CHANGE_TEXT_CURRENT_CELL = 'CHANGE_TEXT_CURRENT_CELL';

export interface ITable {
  currentCellTExt: string;
}

// Actions
export interface IActionChangeTextCurrentCell {
  type: typeof CHANGE_TEXT_CURRENT_CELL;
  data: string;
}

export type TTableActions = IActionChangeTextCurrentCell;
