import { IPage, IPageParams } from 'router-for-dom';
import { $ } from 'helper-for-dom';
import { IComponent } from '@/core/interface';

// components for table page
import * as Components from '@/components';

const arrayOfComponents = Object.values(Components);

export class TablePage implements IPage {
  /**
   * This field stores instances of classes.
   * @private - This field is private
   */
  private classInstances: IComponent[] = [];

  constructor(private params: IPageParams) {
    this.init();
  }

  private init(): void {}

  public toHtml(): HTMLElement {
    const $root = $.create('div', 'excel');
    const $childRoot = $.create('div', 'excel__container');

    this.classInstances = arrayOfComponents.map((Component) => {
      const $wrapperEl = $.create('div', Component.className);

      const component = new Component();

      $wrapperEl.html(component.toHtml());
      $childRoot.append($wrapperEl);
      return component;
    });

    $root.append($childRoot);
    return $root.$el;
  }
}
