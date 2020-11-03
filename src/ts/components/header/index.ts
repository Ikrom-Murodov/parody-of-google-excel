import { IComponent } from '@/core/interface';
import { $ } from 'helper-for-dom';

export class Header implements IComponent {
  static className = 'excel-header';

  public toHtml(): HTMLElement {
    const $wrapper = $.create('div', 'excel-header__container');

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

  public destroy(): void {}
}
