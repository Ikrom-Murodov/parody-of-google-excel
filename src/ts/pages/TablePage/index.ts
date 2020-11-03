import { IPage, IPageParams } from 'router-for-dom';
import { $ } from 'helper-for-dom';

export class TablePage implements IPage {
  constructor(private params: IPageParams) {
    this.init();
  }

  private init(): void {}

  public toHtml(): HTMLElement {
    const $root = $.create('div', 'excel');
    const $childRoot = $.create('div', 'excel__container');

    return $root.$el;
  }
}
