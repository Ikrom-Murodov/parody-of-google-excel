import { $, IDomHelper, TDomHelperCssParams } from 'helper-for-dom';
import { ExcelComponent } from '@/core/ExcelComponent';
import { IComponent, IComponentSettings, ICellId } from '@/core/interface';
import { TableSelectCell } from './table.select.cell';
import { componentTemplate } from './table.component.template';
import { TRootState } from '@/store';

import { getCellId, getCellIds, nextSelector } from './utils';
import resizeTable from './resize.table';

export class Table extends ExcelComponent implements IComponent {
  private selectCell: TableSelectCell = new TableSelectCell({
    activeClass: 'excel-table-rows__cell_selected',
  });

  readonly $root: IDomHelper;

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: ['mousedown', 'keydown', 'input'],
      subscribeToState: [],
      ...parentData,
    });

    this.$root = componentParams.$root;
  }

  static className = 'excel-table';

  public storeChanged(state: TRootState) {}

  public toHtml(): HTMLElement {
    return componentTemplate(1000);
  }

  public addFocusToItem($element: IDomHelper): void {
    this.selectCell.select($element);
    this.$emit('table:input', $element.getText());
  }

  public onInput = (event: MouseEvent) => {
    const $target: IDomHelper = $(event.target as HTMLElement);
    this.$emit('table:input', $target.getText());
  };

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
              return this.$root.find(selector) as IDomHelper;
            },
          );

          this.selectCell.selectGroup($cells);
        } else {
          this.addFocusToItem($target);
        }
      }

      if ($target.dataset().resizeType) {
        resizeTable($target, this.$root);
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

      const $next = this.$root.find(nextSelector(key, cellId)) as IDomHelper;

      this.addFocusToItem($next);
    }
  };

  public init(): void {
    super.init();

    this.addFocusToItem(this.$root.find('[data-cell-id="0:0"]') as IDomHelper);

    this.$on('formula:input', (text: unknown): void => {
      if (typeof text === 'string') {
        this.selectCell.getCurrentElement.updateText(text);
      }
    });

    this.$on('formula:done', (): void => {
      this.selectCell.getCurrentElement.focus();
    });

    this.$on('toolbar:applyStyle', (styles: unknown) => {
      this.selectCell.addStyles(styles as TDomHelperCssParams);
    });
  }

  public destroy(): void {}
}
