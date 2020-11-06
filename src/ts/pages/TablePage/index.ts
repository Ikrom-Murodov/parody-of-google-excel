import { IPage, IPageParams } from 'router-for-dom';
import { $, IDomHelper } from 'helper-for-dom';
import { EventEmitter, IEventEmitter } from 'observer-pattern-js';
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

  /**
   * This field is an instance of the EventEmitter class
   * @private - This field is private
   */
  private emitter: IEventEmitter = new EventEmitter();

  constructor(private params: IPageParams) {
    this.init();
  }

  private init(): void {}

  public toHtml(): HTMLElement {
    const $root = $.create('div', 'excel');
    const $childRoot = $.create('div', 'excel__container');

    this.classInstances = arrayOfComponents.map((Component) => {
      const $wrapperEl: IDomHelper = $.create('div', Component.className);

      const component = new Component({
        componentParams: {
          $root: $wrapperEl,
        },

        parentData: {
          element: $wrapperEl.$el,
          emitter: this.emitter,
          router: this.params.router,
        },
      });

      $wrapperEl.html(component.toHtml());
      $childRoot.append($wrapperEl);
      return component;
    });

    $root.append($childRoot);
    return $root.$el;
  }

  public afterRenderElement(): void {
    this.classInstances.forEach((component) => component.init());
  }
}
