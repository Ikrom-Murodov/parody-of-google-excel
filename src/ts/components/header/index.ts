import { ExcelComponent } from '@/core/ExcelComponent';

import {
  IComponent,
  IComponentParams,
  IComponentSettings,
} from '@/core/interface';

import { $, IDomHelper } from 'helper-for-dom';

export class Header extends ExcelComponent implements IComponent {
  static className = 'excel-header';

  private componentParams: IComponentParams;

  constructor({ componentParams, parentData }: IComponentSettings) {
    super({
      eventNames: [],
      ...parentData,
    });

    this.componentParams = componentParams;
  }

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

  public init(): void {
    super.init();
  }

  public destroy(): void {}
}
