import { ICellStyles } from '@/core/interface';

export const CHANGE_TEXT_CURRENT_CELL = 'CHANGE_TEXT_CURRENT_CELL';
export const CHANGE_STYLES_CURRENT_CELL = 'CHANGE_STYLES_CURRENT_CELL';
export const CHANGE_CELL_STYLES = 'CHANGE_CELL_STYLES';
export const CHANGE_CELL_TEXTS = 'CHANGE_CELL_TEXTS';

export interface ITablePage {
  currentCellText: string;
  currentCellStyles: ICellStyles;
  cellStyles: { [key: string]: ICellStyles };
  cellText: { id: string; text: string }[];
}

// Actions

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

export interface IActionChangeCellTexts {
  type: typeof CHANGE_CELL_TEXTS;
  data: { id: string; text: string };
}

// Actions //

export type TTablePageActions =
  | IActionChangeTextCurrentCell
  | IActionChangeStylesCurrentCell
  | IActionChangeCellStyles
  | IActionChangeCellTexts;
