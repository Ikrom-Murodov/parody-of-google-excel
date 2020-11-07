import { ExcelComponent } from '@/core/ExcelComponent';
import { IComponent, IComponentSettings } from '@/core/interface';

import { $, IDomHelper } from 'helper-for-dom';

export class Formula extends ExcelComponent implements IComponent {
  static className = 'excel-formula';

  private $root: IDomHelper;

  private $formulaInput!: IDomHelper;

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: ['input', 'keydown'],
      ...parentData,
    });

    this.$root = componentParams.$root;
  }

  public onInput = (event: InputEvent): void => {
    const $target: IDomHelper = $(event.target as HTMLElement);

    this.$emit('formula:input', $target.getText());
  };

  public onKeydown = (event: KeyboardEvent): void => {
    const keys: string[] = ['Enter', 'Tab'];

    if (keys.includes(event.key)) {
      event.preventDefault();

      this.$emit('formula:done');
    }
  };

  public toHtml(): HTMLElement {
    const $wrapper: IDomHelper = $.create('div', 'excel-formula__container');
    $wrapper.html(`
      <div class="excel-formula__info">fx</div>
      <div data-type="formula-input" class="excel-formula__input" contenteditable></div>
    `);

    return $wrapper.$el;
  }

  public init(): void {
    super.init();

    this.$formulaInput = this.$root.find(
      '[data-type="formula-input"]',
    ) as IDomHelper;

    this.$on('table:input', (text: unknown): void => {
      if (typeof text === 'string') {
        this.$formulaInput.updateText(text);
      }
    });
  }

  public destroy(): void {}
}
