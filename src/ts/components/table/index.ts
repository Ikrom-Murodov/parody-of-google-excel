import { $, IDomHelper } from 'helper-for-dom';
import { ExcelComponent } from '@/core/ExcelComponent';
import {
  IComponent,
  IComponentSettings,
  IComponentParams,
  ICellId,
} from '@/core/interface';
import { TableSelectCell } from './table.select.cell';
import { componentTemplate } from './table.component.template';

import { getCellId, getCellIds, nextSelector } from './utils';

export class Table extends ExcelComponent implements IComponent {
  private componentParams: IComponentParams;

  private selectCell: TableSelectCell = new TableSelectCell({
    activeClass: 'excel-table-rows__cell_selected',
  });

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: ['mousedown', 'keydown'],
      ...parentData,
    });

    this.componentParams = componentParams;
  }

  static className = 'excel-table';

  public toHtml(): HTMLElement {
    return componentTemplate(1000);
  }

  public addFocusToItem($element: IDomHelper): void {
    this.selectCell.select($element);
  }

  public onMousedown = (event: MouseEvent): void => {
    if (event.target instanceof HTMLElement) {
      const $target: IDomHelper = $(event.target);
      const { columnId, cellId, type } = $target.dataset();

      if (columnId && cellId && type === 'cell') {
        if (event.shiftKey) {
          const cellIds = getCellIds(
            getCellId(this.selectCell.getCurrentElement),
            getCellId($target),
          );

          const $cells = cellIds.map(
            (id: string): IDomHelper => {
              const selector: string = `[data-cell-id="${id}"]`;
              return this.componentParams.$root.find(selector) as IDomHelper;
            },
          );

          this.selectCell.selectGroup($cells);
        } else {
          this.addFocusToItem($target);
        }
      }
    }
  };

  public onKeydown = (event: KeyboardEvent): void => {
    const keys: string[] = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const { key } = event;

    if (keys.includes(key)) {
      event.preventDefault();

      const cellId: ICellId = getCellId(this.selectCell.getCurrentElement);

      const $next = this.componentParams.$root.find(
        nextSelector(key, cellId),
      ) as IDomHelper;

      this.addFocusToItem($next);
    }
  };

  public init(): void {
    super.init();
  }

  public destroy(): void {}
}
