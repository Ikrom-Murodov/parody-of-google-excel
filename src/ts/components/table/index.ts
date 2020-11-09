import { $, IDomHelper, TDomHelperCssParams } from 'helper-for-dom';
import {
  IComponent,
  IComponentSettings,
  ICellId,
  ICellStyles,
} from '@/core/interface';
import { defaultCurrentStylesCell } from '@/core/defaultValue';
import { IColumnState, IRowState } from '@/store/types';
import { ExcelComponent } from '@/core/ExcelComponent';
import { actions, TRootState } from '@/store';
import { parse } from '@/utils';

import { componentTemplate } from './table.component.template';
import { getCellId, getCellIds, nextSelector } from './utils';
import { TableSelectCell } from './table.select.cell';
import resizeTable from './resize.table';

export class Table extends ExcelComponent implements IComponent {
  static className = 'excel-table';

  /**
   * This field contains an instance of the TableSelectCell class.
   * @private - This field is not available to instances of the Table class.
   */
  private selectCell: TableSelectCell = new TableSelectCell({
    activeClass: 'excel-table-rows__cell_selected',
  });

  /**
   * This field contains the main html element of the component.
   * @readonly
   */
  readonly $root: IDomHelper;

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: ['mousedown', 'keydown', 'input'],
      subscribeToChangeStorage: [],
      ...parentData,
    });

    this.$root = componentParams.$root;
  }

  /**
   * If the component is subscribed to change this method will be called
   *   when the state is updated
   * @param {TRootState} state - Updated state of the store.
   * @public - This method is available to all instances of the Table class.
   *   But this method is not intended to be called directly.
   */
  public storeChanged(state: TRootState) {}

  /**
   * This method will be called to get the component template.
   * @public - This method is available to all instances of the Table class.
   * @return {HTMLElement} - Returns the page template.
   */
  public toHtml(): HTMLElement {
    return componentTemplate(1000, this.$getState());
  }

  public addFocusToItem($element: IDomHelper): void {
    this.selectCell.select($element);

    this.$dispatch(
      actions.changeTextCurrentCell($element.getAttr('data-value') || ''),
    );

    // eslint-disable-next-line
    const cellStyles: any = $element.getStyles(
      Object.keys(defaultCurrentStylesCell) as Array<keyof ICellStyles>,
    );

    this.$dispatch(actions.changeStylesCurrentCell(cellStyles));
  }

  /**
   * This method will be called when a input event occurs on the component
   *   template.
   * @param {MouseEvent} event
   * @public - This method is available to all instances of the Table class.
   *   But this method is not intended to be called directly
   * @return { void } - This method returns nothing.
   */
  public onInput = (event: MouseEvent) => {
    const $target: IDomHelper = $(event.target as HTMLElement);
    $target.addAttr('data-value', $target.getText());

    this.$dispatch(
      actions.changeCellsText({
        text: $target.getText(),
        id: $target.dataset().cellId as string,
      }),
    );
  };

  /**
   * This method will be called when a mousedown event occurs on the component
   *   template.
   * @param {MouseEvent} event
   * @public - This method is available to all instances of the Table class.
   *   But this method is not intended to be called directly
   * @return { void } - This method returns nothing.
   */
  public onMousedown = async (event: MouseEvent): Promise<void> => {
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
        const data = await resizeTable($target, this.$root);

        if (data.type === 'column') {
          this.$dispatch(actions.resizeColumn({ ...(data as IColumnState) }));
        } else {
          this.$dispatch(actions.resizeRow({ ...(data as IRowState) }));
        }
      }
    }
  };

  /**
   * This method will be called when a keydown event occurs on the component
   *   template.
   * @param {MouseEvent} event
   * @public - This method is available to all instances of the Table class.
   *   But this method is not intended to be called directly
   * @return { void } - This method returns nothing.
   */
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

  /**
   * This method will be called to initialize the component.
   * @public - This method is available to all instances of the Table class.
   * @return { void } - This method returns nothing.
   */
  public init(): void {
    super.init();

    const $cell = this.$root.find('[data-cell-id="0:0"]') as IDomHelper;
    this.addFocusToItem($cell);

    this.$emit('table:select', $cell.getAttr('data-value'));

    this.$on('formula:input', (text: unknown): void => {
      if (typeof text === 'string') {
        const $element: IDomHelper = this.selectCell.getCurrentElement.addAttr(
          'data-value',
          text,
        );

        $element.updateText(parse(text));

        this.$dispatch(
          actions.changeCellsText({
            text,
            id: $element.dataset().cellId as string,
          }),
        );
      }
    });

    this.$on('formula:done', (): void => {
      this.selectCell.getCurrentElement.focus();
    });

    this.$on('toolbar:applyStyle', (style: unknown) => {
      const styles: ICellStyles = this.selectCell.addStyles(
        style as TDomHelperCssParams,
      );
      const ids: string[] = this.selectCell.getIdsSelectedCells;

      this.$dispatch(
        actions.changeCellStyles({
          styles,
          ids,
        }),
      );
    });
  }

  /**
   * This method will be called to destroy the component.
   * @public - This method is available to all instances of the Table class.
   * @return { void } - This method returns nothing.
   */
  public destroy(): void {}
}
