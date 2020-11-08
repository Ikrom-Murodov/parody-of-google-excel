import { ICellStyles } from '@/core/interface';

import {
  CHANGE_CELL_STYLES,
  CHANGE_CELL_TEXTS,
  CHANGE_STYLES_CURRENT_CELL,
  CHANGE_TEXT_CURRENT_CELL,
  IActionChangeCellStyles,
  IActionChangeCellTexts,
  IActionChangeStylesCurrentCell,
  IActionChangeTextCurrentCell,
} from './types';

export function changeCellTexts(data: {
  id: string;
  text: string;
}): IActionChangeCellTexts {
  return {
    data,
    type: CHANGE_CELL_TEXTS,
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
