import {
  IComponent,
  IComponentParams,
  IComponentSettings,
} from '@/core/interface';
import { ExcelComponent } from '@/core/ExcelComponent';
import { $, IDomHelper } from 'helper-for-dom';
import { TRootState } from '@/store';

import { componentTemplate } from './toolbar.component.template';

export class Toolbar extends ExcelComponent implements IComponent {
  static className = 'excel-toolbar';

  /**
   * This field contains the parameters of the component.
   * @private - This field is not available to instances of the Toolbar class.
   */
  private ExcelComponent: IComponentParams;

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: ['click'],
      subscribeToChangeStorage: ['currentCellStyles'],
      ...parentData,
    });

    this.ExcelComponent = componentParams;
  }

  /**
   * If the component is subscribed to change this method will be called
   *   when the state is updated
   * @param {TRootState} state - Updated state of the store.
   * @public - This method is available to all instances of the Toolbar class.
   *   But this method is not intended to be called directly.
   */
  public storeChanged(state: TRootState) {
    this.$repeatRenderComponent();
  }

  /**
   * This method will be called to get the component template.
   * @public - This method is available to all instances of the Toolbar class.
   * @return {HTMLElement} - Returns the page template.
   */
  public toHtml(): HTMLElement {
    return componentTemplate(this.$getState());
  }

  /**
   * This method will be called when a click event occurs on the component
   *   template.
   * @param {MouseEvent} event
   * @public - This method is available to all instances of the Toolbar class.
   *   But this method is not intended to be called directly
   * @return { void } - This method returns nothing.
   */
  public onClick = (event: MouseEvent): void => {
    const $target: IDomHelper = $(event.target as HTMLElement);
    const { type, value } = $target.dataset();

    if (type === 'button') {
      const styles = JSON.parse(value as string);
      this.$emit('toolbar:applyStyle', styles);
    }
  };

  /**
   * This method will be called to initialize the component.
   * @public - This method is available to all instances of the Toolbar class.
   * @return { void } - This method returns nothing.
   */
  public init(): void {
    super.init();
  }

  /**
   * This method will be called to destroy the component.
   * @public - This method is available to all instances of the Toolbar class.
   * @return { void } - This method returns nothing.
   */
  public destroy(): void {}
}
