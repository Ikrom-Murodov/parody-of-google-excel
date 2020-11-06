import { ExcelComponent } from '@/core/ExcelComponent';

import {
  IComponent,
  IComponentParams,
  IComponentSettings,
} from '@/core/interface';

import { $, IDomHelper } from 'helper-for-dom';

export class Formula extends ExcelComponent implements IComponent {
  static className = 'excel-formula';

  private componentParams: IComponentParams;

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: [],
      ...parentData,
    });

    this.componentParams = componentParams;
  }

  public toHtml(): HTMLElement {
    const $wrapper: IDomHelper = $.create('div', 'excel-formula__container');
    $wrapper.html(`
      <div class="excel-formula__info">fx</div>
      <div class="excel-formula__input" contenteditable></div>
    `);

    return $wrapper.$el;
  }

  public init(): void {
    super.init();
  }

  public destroy(): void {}
}
