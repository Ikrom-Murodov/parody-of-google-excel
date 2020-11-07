import {
  CHANGE_TEXT_CURRENT_CELL,
  IActionChangeTextCurrentCell,
} from './types';

export function changeTextCurrentCell(
  data: string,
): IActionChangeTextCurrentCell {
  return {
    data,
    type: CHANGE_TEXT_CURRENT_CELL,
  };
}
