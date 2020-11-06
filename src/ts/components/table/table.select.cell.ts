import { IDomHelper } from 'helper-for-dom';

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
   * this function returns the currently selected html element.
   * @public - This field is available to all instances of the TableSelectCell class.
   * @return {IDomHelper} -
   */
  public get getCurrentElement(): IDomHelper {
    return this.currentElement;
  }
}
