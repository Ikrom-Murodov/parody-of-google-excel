import { $, IDomHelper } from 'helper-for-dom';

import { ExcelComponent } from '@/core/ExcelComponent';

import {
  IComponent,
  IComponentSettings,
  IComponentParams,
} from '@/core/interface';

import { createArray } from '@/utils';

import { TableSelectCell } from './table.select.cell';

import { componentTemplate } from './table.component.template';

/**
 * @interface
 */
interface ICellId {
  row: number;
  column: number;
}

export class Table extends ExcelComponent implements IComponent {
  private componentParams: IComponentParams;

  private selectCell: TableSelectCell = new TableSelectCell({
    activeClass: 'excel-table-rows__cell_selected',
  });

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: ['mousedown'],
      ...parentData,
    });

    this.componentParams = componentParams;
  }

  static className = 'excel-table';

  public toHtml(): HTMLElement {
    return componentTemplate(1000);
  }

  public onMousedown = (event: MouseEvent): void => {
    if (event.target instanceof HTMLElement) {
      const $target: IDomHelper = $(event.target);
      const { columnId, cellId, type } = $target.dataset();

      if (columnId && cellId && type === 'cell') {
        if (event.shiftKey) {
          const cellIds = this.getCellIds(
            this.getCellId(this.selectCell.getCurrentElement),
            this.getCellId($target),
          );

          const $cells = cellIds.map(
            (id: string): IDomHelper => {
              const selector: string = `[data-cell-id="${id}"]`;
              return this.componentParams.$root.find(selector) as IDomHelper;
            },
          );

          this.selectCell.selectGroup($cells);
        } else {
          this.selectCell.select($target);
        }
      }
    }
  };

  public getCellId($element: IDomHelper): ICellId {
    const [row, column] = $element.dataset().cellId!.split(':');

    return {
      row: +row,
      column: +column,
    };
  }

  public getCellIds(current: ICellId, target: ICellId): string[] {
    const columns = createArray(current.column, target.column);
    const rows = createArray(current.row, target.row);

    const cellIds = columns.reduce((acc: string[], column) => {
      rows.forEach((row) => acc.push(`${row}:${column}`));
      return acc;
    }, []);

    return cellIds;
  }

  public init(): void {
    super.init();
  }

  public destroy(): void {}
}
