import { $, IDomHelper } from 'helper-for-dom';

import { ExcelComponent } from '@/core/ExcelComponent';

import {
  IComponent,
  IComponentSettings,
  IComponentParams,
} from '@/core/interface';

import { TableSelectCell } from './table.select.cell';

import { componentTemplate } from './table.component.template';

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
        this.selectCell.select($target);
      }
    }
  };

  public init(): void {
    super.init();
  }

  public destroy(): void {}
}
