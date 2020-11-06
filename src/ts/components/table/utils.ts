import { ICellId } from '@/core/interface';
import { IDomHelper } from 'helper-for-dom';
import { createArray } from '@/utils';

/**
 * This function returns the selector of the next html element.
 * @param {string} key - The name of the key on which the event occurred.
 * @param {ICellId} cellId - cell id
 * @return {string} - The next html element selector.
 */
export function nextSelector(key: string, cellId: ICellId): string {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      cellId.row += 1;
      break;

    case 'ArrowUp':
      if (cellId.row) cellId.row -= 1;
      break;

    case 'ArrowLeft':
      if (cellId.column) cellId.column -= 1;
      break;

    case 'ArrowRight':
    case 'Tab':
      if (cellId.column < 25) cellId.column += 1;
      break;

    default:
      break;
  }

  return `[data-cell-id="${cellId.row}:${cellId.column}"]`;
}

/**
 * This function returns cell ids as an object.
 * @param {IDomHelper} $element
 * @return {ICellId} - Returns cell ids
 */
export function getCellId($element: IDomHelper): ICellId {
  const [row, column] = $element.dataset().cellId!.split(':');

  return {
    row: +row,
    column: +column,
  };
}

/**
 * This function returns the cell ids from current to target.
 * @param {ICellId} current
 * @param {ICellId} target
 * @return {Array<number>} - Cell identifiers as array elements.
 */
export function getCellIds(current: ICellId, target: ICellId): string[] {
  const columns = createArray(current.column, target.column);
  const rows = createArray(current.row, target.row);

  const cellIds = columns.reduce((acc: string[], column) => {
    rows.forEach((row) => acc.push(`${row}:${column}`));
    return acc;
  }, []);

  return cellIds;
}
