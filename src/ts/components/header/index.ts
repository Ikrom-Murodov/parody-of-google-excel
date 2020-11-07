import { $, IDomHelper } from 'helper-for-dom';
import {
  IComponent,
  IComponentParams,
  IComponentSettings,
} from '@/core/interface';
import { ExcelComponent } from '@/core/ExcelComponent';
import { TRootState } from '@/store';

export class Header extends ExcelComponent implements IComponent {
  static className = 'excel-header';

  /**
   * This field contains the parameters of the component.
   * @private - This field is not available to instances of the Header class.
   */
  private componentParams: IComponentParams;

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: [],
      subscribeToChangeStorage: [],
      ...parentData,
    });

    this.componentParams = componentParams;
  }

  /**
   * If the component is subscribed to change this method will be called
   *   when the state is updated
   * @param {TRootState} state - Updated state of the store.
   * @public - This method is available to all instances of the Header class.
   *   But this method is not intended to be called directly.
   */
  public storeChanged(state: TRootState) {}

  /**
   * This method will be called to get the component template.
   * @public - This method is available to all instances of the Header class.
   * @return {HTMLElement} - Returns the page template.
   */
  public toHtml(): HTMLElement {
    const $wrapper: IDomHelper = $.create('div', 'excel-header__container');

    $wrapper.html(`
      <div class="excel-header__wrapper-input">
        <input class="excel-header__input" type="text" value="New table" >
      </div>
      
      <div class="excel-header__wrapper-buttons">
        <div data-type="exit" class="excel-header__button">
          <i data-type="exit" class="material-icons">exit_to_app</i>
        </div>
        
        <div data-type="delete" class="excel-header__button">
          <i data-type="delete" class="material-icons">delete</i>
        </div>
      </div>
    `);

    return $wrapper.$el;
  }

  /**
   * This method will be called to initialize the component.
   * @public - This method is available to all instances of the Header class.
   * @return { void } - This method returns nothing.
   */
  public init(): void {
    super.init();
  }

  /**
   * This method will be called to destroy the component.
   * @public - This method is available to all instances of the Header class.
   * @return { void } - This method returns nothing.
   */
  public destroy(): void {}
}
