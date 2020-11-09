import { ExcelComponent } from '@/core/ExcelComponent';
import { IComponent, IComponentSettings } from '@/core/interface';
import { TRootState } from '@/store';
import { $, IDomHelper } from 'helper-for-dom';

export class Formula extends ExcelComponent implements IComponent {
  static className = 'excel-formula';

  /**
   * This field contains the main html element of the component.
   * @private - This field is not available to instances of the Formula class.
   */
  private $root: IDomHelper;

  /**
   * This field contains the input element of the component.
   * @private - This field is not available to instances of the Formula class.
   */
  private $formulaInput!: IDomHelper;

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: ['input', 'keydown'],
      subscribeToChangeStorage: ['currentCellText'],
      ...parentData,
    });

    this.$root = componentParams.$root;
  }

  /**
   * If the component is subscribed to change this method will be called
   *   when the state is updated
   * @param {TRootState} state - Updated state of the store.
   * @public - This method is available to all instances of the Formula class.
   *   But this method is not intended to be called directly.
   */
  public storeChanged(state: TRootState) {
    this.$formulaInput.updateText(state.currentCellText);
  }

  /**
   * This method will be called when a input event occurs on the component
   *   template.
   * @param {MouseEvent} event
   * @public - This method is available to all instances of the Formula class.
   *   But this method is not intended to be called directly
   * @return { void } - This method returns nothing.
   */
  public onInput = (event: InputEvent): void => {
    const $target: IDomHelper = $(event.target as HTMLElement);
    this.$emit('formula:input', $target.getText());
  };

  /**
   * This method will be called when a keydown event occurs on the component
   *   template.
   * @param {MouseEvent} event
   * @public - This method is available to all instances of the Formula class.
   *   But this method is not intended to be called directly
   * @return { void } - This method returns nothing.
   */
  public onKeydown = (event: KeyboardEvent): void => {
    const keys: string[] = ['Enter', 'Tab'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  };

  /**
   * This method will be called to get the component template.
   * @public - This method is available to all instances of the Formula class.
   * @return {HTMLElement} - Returns the page template.
   */
  public toHtml(): HTMLElement {
    const $wrapper: IDomHelper = $.create('div', 'excel-formula__container');
    $wrapper.html(`
      <div class="excel-formula__info">fx</div>
      <div data-type="formula-input" class="excel-formula__input" contenteditable></div>
    `);

    return $wrapper.$el;
  }

  /**
   * This method will be called to initialize the component.
   * @public - This method is available to all instances of the Formula class.
   * @return { void } - This method returns nothing.
   */
  public init(): void {
    super.init();

    this.$formulaInput = this.$root.find(
      '[data-type="formula-input"]',
    ) as IDomHelper;

    this.$on('table:select', (text) => {
      if (typeof text === 'string') this.$formulaInput.updateText(text);
    });
  }

  /**
   * This method will be called to destroy the component.
   * @public - This method is available to all instances of the Formula class.
   * @return { void } - This method returns nothing.
   */
  public destroy(): void {}
}
