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
      eventNames: ['mousedown', 'keydown'],
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

      const cellId = this.getCellId(this.selectCell.getCurrentElement);

      const $next = this.componentParams.$root.find(
        this.nextSelector(key, cellId),
      ) as IDomHelper;

      this.selectCell.select($next);
    }
  };

  public nextSelector(key: string, cellId: ICellId): string {
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
