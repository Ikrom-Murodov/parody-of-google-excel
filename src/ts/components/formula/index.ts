import { IComponent } from '@/core/interface';
import { $ } from 'helper-for-dom';

export class Formula implements IComponent {
  static className = 'excel-formula';

  public toHtml(): HTMLElement {
    const $wrapper = $.create('div', 'excel-formula__container');
    $wrapper.html(`
      <div class="excel-formula__info">fx</div>
      <div class="excel-formula__input" contenteditable></div>
    `);

    return $wrapper.$el;
  }

  public destroy(): void {}
}
