import { $, TDomHelperCssParams } from 'helper-for-dom';
import { TRootState } from '@/store';
import { defaultCurrentStylesCell } from '@/core/defaultValue';

let appState: TRootState;

const charCode = {
  A: 65,
  Z: 90,
  size(): number {
    return this.Z - this.A + 1;
  },
};

/**
 * This function returns the column template of the table component.
 * @return {string} - Html template
 */
function columnTemplate(_: unknown, index: number): string {
  const width = appState.columnsState.find(({ id }) => id === index)?.width;

  const value: string = String.fromCharCode(charCode.A + index);
  const $element = $.create('div', 'excel-table-rows__column');
  $element.addAttr('data-column-id', String(index));
  $element.addAttr('data-resize-element', '');
  $element.addAttr('data-min-width', '100');
  $element.html(
    `${value} <div class="excel-table-rows__column-resize" data-resize-type="column"></div>`,
  );

  if (width) $element.css({ width: `${width}px` });

  return $element.$el.outerHTML;
}

/**
 * This function creates all the columns of the table component and then returns.
 * @return {string} - Html template
 */
function createColumnsTemplate(): string {
  const columns: string = new Array(charCode.size())
    .fill('')
    .map(columnTemplate)
    .join(' ');

  return columns;
}

/**
 * This function returns a function that returns the cell
 *   template of the table component.
 * @return {Function}
 */
function cellTemplate(rowId: number) {
  return (_: unknown, columnId: number): string => {
    const cellId = `${rowId}:${columnId}`;
    const text = appState.cellsText.find(({ id }) => id === cellId)?.text || '';
    const styles = appState.cellStyles[cellId] || defaultCurrentStylesCell;
    const width = appState.columnsState.find(({ id }) => id === columnId)
      ?.width;

    const $template = $.create('div', 'excel-table-rows__cell');
    $template.addAttr('contenteditable', '');
    $template.addAttr('data-column-id', String(columnId));
    $template.addAttr('data-cell-id', String(cellId));
    $template.addAttr('data-type', 'cell');
    $template.updateText(text);
    $template.css(styles as TDomHelperCssParams);
    if (width) $template.css({ width: `${width}px` });

    return $template.$el.outerHTML;
  };
}

/**
 * This function returns the main template of the component table,
 *   in which the rest of the templates will be located
 * @param {string} content - Content that will be inside this template.
 * @param {number=} index - Content for 'excel-table-rows__info'
 * @return {string} - Html template
 */
function rowTemplate(content: string, index?: number): string {
  const height = appState.rowsState.find(({ id }) => id === index)?.height;

  const $template = $.create('div', 'excel-table-rows excel-table__rows');
  const resize = index
    ? '<div class="excel-table-rows__info-resize" data-resize-type="row"></div>'
    : '';

  $template.html(`
    <div class="excel-table-rows__info" 
      style="height: ${height}px"
      data-row-id="${index || ''}" 
      data-min-height="28" 
    data-resize-element>
      ${index || ''}
      ${resize}
    </div>
    
    
    <div class="excel-table-rows__data">
      ${content}
    </div>
  `);

  return $template.$el.outerHTML;
}

/**
 * This function creates an html element, adds component content to it, and
 *   returns that html element.
 * @param {number} rowsCount
 * @param {TRootState} state - app state.
 * @return {HTMLElement}
 */
export function componentTemplate(
  rowsCount: number = 150,
  state: TRootState,
): HTMLElement {
  const $wrapper = $.create('div', 'excel-table__container');
  const rows: string[] = [];

  appState = state;

  rows.push(rowTemplate(createColumnsTemplate()));

  for (let index = 0; index < rowsCount; index += 1) {
    const cells: string = new Array(charCode.size())
      .fill('')
      .map(cellTemplate(index))
      .join(' ');

    rows.push(rowTemplate(cells, index + 1));
  }

  return $wrapper.html(rows.join(' ')).$el;
}
