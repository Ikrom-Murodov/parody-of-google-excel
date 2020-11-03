import { $ } from 'helper-for-dom';

const charCode = {
  A: 65,
  Z: 90,
  size(): number {
    return this.Z - this.A + 1;
  },
};

/**
 * This function returns the column template of the table component.
 *
 * @return {string} - Html template
 */
function columnTemplate(_: unknown, index: number): string {
  const value: string = String.fromCharCode(charCode.A + index);
  const $element = $.create('div', 'excel-table-rows__column');
  $element.html(value);

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
 * This function returns the cell template of the table component.
 * @return {string} - Html template
 */
function cellTemplate(): string {
  const $template = $.create('div', 'excel-table-rows__cell');

  return $template.$el.outerHTML;
}

/**
 * This function returns the main template of the component table,
 *   in which the rest of the templates will be located
 *
 * @param {string} content - Content that will be inside this template.
 * @return {string} - Html template
 */
function rowTemplate(content: string): string {
  const $template = $.create('div', 'excel-table-rows excel-table__rows');

  $template.html(`
    <div class="excel-table-rows__info">
    
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
 *
 * @param {number} rowsCount
 *
 * @return {HTMLElement}
 */
export function componentTemplate(rowsCount: number = 150): HTMLElement {
  const $wrapper = $.create('div', 'excel-table__container');
  const rows: string[] = [];

  rows.push(rowTemplate(createColumnsTemplate()));

  for (let index = 0; index < rowsCount; index += 1) {
    const cells: string = new Array(charCode.size())
      .fill('')
      .map(cellTemplate)
      .join(' ');

    rows.push(rowTemplate(cells));
  }

  return $wrapper.html(rows.join(' ')).$el;
}
