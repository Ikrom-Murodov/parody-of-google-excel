import { $, IDomHelper } from 'helper-for-dom';
import {
  IComponent,
  IComponentParams,
  IComponentSettings,
} from '@/core/interface';
import { ExcelComponent } from '@/core/ExcelComponent';
import { actions, TRootState } from '@/store';
import { storage } from '@/utils';

function delay(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export class Header extends ExcelComponent implements IComponent {
  static className = 'excel-header';

  /**
   * This field contains the parameters of the component.
   * @private - This field is not available to instances of the Header class.
   */
  private componentParams: IComponentParams;

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: ['input', 'click'],
      subscribeToChangeStorage: [],
      ...parentData,
    });

    this.componentParams = componentParams;
  }

  public onClick = async (event: MouseEvent): Promise<void> => {
    const $target = $(event.target as HTMLElement);

    if ($target.dataset()?.type === 'delete') {
      await storage.removeItem(`table:${this.$getStateHistory.id}`);
      await this.$push('/');
    }
  };

  /**
   * This method will be called when a input event occurs on the component
   *   template.
   * @param {MouseEvent} event
   * @public - This method is available to all instances of the Header class.
   *   But this method is not intended to be called directly
   * @return { void } - This method returns nothing.
   */
  public onInput = (event: InputEvent): void => {
    const $target: IDomHelper = $(event.target as HTMLInputElement);
    this.$dispatch(actions.changeTableName($target.getText()));
  };

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
    const { tableName } = this.$getState();

    $wrapper.html(`
      <div class="excel-header__wrapper-input">
        <input class="excel-header__input" type="text" value="${tableName}" >
      </div>
      
      <div class="excel-header__wrapper-buttons">
        <div data-router-link="/" class="excel-header__button">
          <i data-router-link="/" class="material-icons">exit_to_app</i>
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
