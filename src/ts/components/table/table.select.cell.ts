import { IDomHelper, TDomHelperCssParams } from 'helper-for-dom';
import { defaultCurrentStylesCell } from '@/core/defaultValue';
import { ICellStyles } from '@/core/interface';

/**
 * Interface for parameter of the TableSelectCell class.
 * @interface
 */
interface ITableSelectCellParams {
  activeClass: string;
}

export class TableSelectCell {
  /**
   * This field contains the HTML element you selected.
   * @private
   */
  private currentElement!: IDomHelper;

  /**
   * This field contains all the HTML elements you selected.
   * @private
   */
  private currentGroupElement: IDomHelper[] = [];

  constructor(private params: ITableSelectCellParams) {}

  /**
   * This function makes focus and also adds active class to html element.
   * @param { IDomHelper } $el - Html element to select.
   * @public - This method is available to all instances of the TableSelectCell class.
   * @return { void } - This method returns nothing.
   */
  public select($el: IDomHelper): void {
    this.clear();
    $el.focus().addClass(this.params.activeClass);
    this.currentGroupElement.push($el);
    this.currentElement = $el;
  }

  /**
   * This function makes the focus and also adds the active class to the html elements.
   * @param { IDomHelper[] } $groupElement - Group of html elements to select.
   * @public - This method is available to all instances of the TableSelectCell class.
   * @return { void } - This method returns nothing.
   */
  public selectGroup($groupElement: IDomHelper[]): void {
    this.clear();

    this.currentGroupElement = $groupElement.map(($element) => {
      $element.addClass(this.params.activeClass);
      return $element;
    });
  }

  /**
   * This function removes active class from html elements.
   * @public - This method is available to all instances of the TableSelectCell class.
   * @return { void } - This method returns nothing.
   */
  public clear(): void {
    this.currentGroupElement.forEach(($element): void => {
      $element.removeClass(this.params.activeClass);
    });

    this.currentGroupElement = [];
  }

  /**
   * This function adds styles to elements and returns default styles.
   * @param {TDomHelperCssParams} styles - Styles to add to elements.
   * @public - This field is available to all instances of the TableSelectCell class.
   * @return {IDomHelper} - Returns default styles.
   */
  public addStyles(styles: TDomHelperCssParams): ICellStyles {
    this.currentGroupElement.forEach(($el) => {
      $el.css(styles);
    });

    return this.currentGroupElement[0].getStyles(
      Object.keys(defaultCurrentStylesCell) as Array<keyof ICellStyles>,
      // eslint-disable-next-line
    ) as any;
  }

  /**
   * this function returns the currently selected html element.
   * @public - This field is available to all instances of the TableSelectCell class.
   * @return {IDomHelper} - returns the currently selected html element.
   */
  public get getCurrentElement(): IDomHelper {
    return this.currentElement;
  }

  /**
   *  This functions returns the ids of the selected cells.
   *  @public - This field is available to all instances of the TableSelectCell class.
   *  @return {string[]} - Returns the ids of the selected cells.
   */
  public get getIdsSelectedCells(): string[] {
    const ids: string[] = this.currentGroupElement.map(
      ($el) => $el.dataset()?.cellId,
    ) as string[];

    return ids;
  }
}
